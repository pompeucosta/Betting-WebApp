using WebApp.Data;
using WebApp.Auth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Auth.Controllers
{
    [Route("")]
    [ApiController]
    public class AccountAuth : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IResult> Login(SignInManager<ApplicationUser> signInManager,UserManager<ApplicationUser> userManager, LoginModel loginModel)
        {
            var user = await userManager.FindByEmailAsync(loginModel.Email);

            if(user == null)
            {
                return Results.BadRequest(new { Message = "Email or Password are incorrect" });
            }

            var result = await signInManager.PasswordSignInAsync(user, loginModel.Password, loginModel.RememberMe, false);

            if(result.Succeeded)
            {
                return Results.Ok(new { Message = "Login successful" });
            }
            else
            {
                return Results.BadRequest(new { Message = "Email or Password are incorrect" });
            }
        }


        [HttpPost("logout"),Authorize]
        public async Task<IResult> Logout(SignInManager<ApplicationUser> signInManager)
        {
            await signInManager.SignOutAsync();
            return Results.Ok(new { Message = "Signout successful"});
        }

        [HttpPost("register")]
        public async Task<IResult> Register(UserManager<ApplicationUser> userManager, UserRegisterModel user, DataContext dbContext)
        {
            var bDate = user.BirthDate;
            if (bDate.Year <= 0 || bDate.Month <= 0 || bDate.Day <= 0)
                return Results.BadRequest(new { Message = "Invalid Birthday Date" });
            
            var identityUser = new ApplicationUser { Email = user.Email, UserName = user.Name };
            var registerResult = await userManager.CreateAsync(identityUser, user.Password);

            if(!registerResult.Succeeded) 
            {
                return Results.BadRequest(new { Messages = registerResult.Errors });
            }

            try
            {
                var newUser = new User { ApplicationUser = identityUser, BirthDate = new DateOnly(bDate.Year, bDate.Month, bDate.Day), PhoneNumber = user.PhoneNumber };
                dbContext.UsersList.Add(newUser);
                await dbContext.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                await userManager.DeleteAsync(identityUser);
                return Results.BadRequest(new {Message =  ex.Message});
            }

            return Results.Ok(new { Message = "Register successful" });

        }
    }
}
