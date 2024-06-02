using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Auth.Models;
using WebApp.BettingTrans.Models;
using WebApp.Data;

namespace WebApp.Auth.Controllers
{
    [Route("")]
    [ApiController]
    public class BetController : ControllerBase
    {
        [HttpPost("deposit")]
        public async Task<IResult> Deposit([FromBody] DepositModel depositModel, [FromServices] DataContext dbContext)
        {
            var userID = depositModel.UserId;

            var user = dbContext.UsersList.Include(c => c.ApplicationUser).FirstOrDefault(c => c.ApplicationUser.Id == userID);
            if (user == null)
            {
                return Results.NotFound(new { Message = "User not found" });
            }
  
            var wallet = await dbContext.WalletsList.SingleOrDefaultAsync(w => w.WalletId == user.WalletID);
            if (wallet == null)
            {
                return Results.NotFound(new { Message = "Wallet not found" });
            }

            wallet.Deposit(depositModel.Amount);
            try
            {
                dbContext.WalletsList.Update(wallet);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Results.BadRequest(new { Message = ex.Message });
            }

            return Results.Ok(new { Message = "Deposit done successfully" });
        }

        [HttpGet("checkBalance")]
        public async Task<IResult> checkBalance(string userID, [FromServices] DataContext dbContext)
        {

            var user = dbContext.UsersList.Include(c => c.ApplicationUser).FirstOrDefault(c => c.ApplicationUser.Id == userID);
            if (user == null)
            {
                return Results.NotFound(new { Message = "User not found" });
            }

            var wallet = await dbContext.WalletsList.SingleOrDefaultAsync(w => w.WalletId == user.WalletID);
            if (wallet == null)
            {
                return Results.NotFound(new { Message = "Wallet not found" });
            }

            var balance = dbContext.WalletsList
                .Where(w => w.WalletId == user.WalletID)
                .Select(w => new { Balance = w.Balance});
            if (balance == null)
            {
                return Results.NotFound(new { Message = "Balance not found" });
            }

            return Results.Ok(new { Balance = balance });
        }

    }
}
