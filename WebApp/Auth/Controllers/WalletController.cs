using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApp.Data;

namespace WebApp.Auth.Controllers
{
    [Route("")]
    [ApiController]
    public class BetController : ControllerBase
    {
        ILogger<BetController> logger;

        public BetController(ILogger<BetController> logger)
        {
            this.logger = logger;
        }

        [HttpPost("deposit"),Authorize]
        public async Task<IResult> Deposit(float amount, DataContext dbContext)
        {
            using var myActivity = OpenTelemetryData.MyActivitySource.StartActivity("deposit");
            var email = User.FindFirstValue(ClaimTypes.Email);
            var userID = dbContext.Users.Where(_u => _u.Email == email).First().Id;

            var user = dbContext.UsersList.Include(c => c.ApplicationUser).FirstOrDefault(c => c.ApplicationUser.Id == userID);
            if (user == null)
            {
                logger.LogError($"Unable to find user - {email}");
                return Results.NotFound(new { Message = "User not found" });
            }

            var wallet = await dbContext.WalletsList.SingleOrDefaultAsync(w => w.WalletId == user.WalletID);
            if (wallet == null)
            {
                return Results.NotFound(new { Message = "Wallet not found" });
            }

            wallet.Deposit(amount);
            try
            {
                dbContext.WalletsList.Update(wallet);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                logger.LogError($"failed to add {amount} to {email} waller - {ex.Message}");
                return Results.BadRequest(new { Message = ex.Message });
            }

            OpenTelemetryData.DepositsCounter.Add(1);
            logger.LogInformation($"added {amount} to {email} wallet");
            return Results.Ok(new { Message = "Deposit done successfully" });
        }

        [HttpGet("checkBalance"),Authorize]
        public async Task<IResult> CheckBalance(DataContext dbContext)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var userID = dbContext.Users.Where(_u => _u.Email == email).First().Id;
            var user = dbContext.UsersList.Include(c => c.ApplicationUser).FirstOrDefault(c => c.ApplicationUser.Id == userID);
            if (user == null)
            {
                logger.LogError($"Unable to find user - {email}");
                return Results.NotFound(new { Message = "User not found" });
            }

            var wallet = await dbContext.WalletsList.SingleOrDefaultAsync(w => w.WalletId == user.WalletID);
            if (wallet == null)
            {
                return Results.NotFound(new { Message = "Wallet not found" });
            }

            return Results.Ok(new { Balance = wallet.Balance });
        }

        [HttpPost("withdraw"),Authorize]
        public async Task<IResult> Withdraw(float amount, DataContext dbContext)
        {
            using var myActivity = OpenTelemetryData.MyActivitySource.StartActivity("withdrawal");
            var email = User.FindFirstValue(ClaimTypes.Email);
            var userID = dbContext.Users.Where(_u => _u.Email == email).First().Id;

            var user = dbContext.UsersList.Include(c => c.ApplicationUser).FirstOrDefault(c => c.ApplicationUser.Id == userID);
            if (user == null)
            {
                logger.LogError($"Unable to find user - {email}");
                return Results.NotFound(new { Message = "User not found" });
            }

            var wallet = await dbContext.WalletsList.SingleOrDefaultAsync(w => w.WalletId == user.WalletID);
            if (wallet == null)
            {
                return Results.NotFound(new { Message = "Wallet not found" });
            }

            var withdrawalResult = wallet.Withdraw(amount);

            if (!withdrawalResult)
            {
                logger.LogWarning($"{email} attempted to withdraw from wallet but didn't have enough currency");
                return Results.BadRequest(new { Message = "Cannot withdrawal more than available in the wallet" });
            }
            try
            {
                dbContext.WalletsList.Update(wallet);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                logger.LogInformation($"Failed to withdraw {amount} from {email} wallet - {ex.Message}");
                return Results.BadRequest(new { Message = ex.Message });
            }

            OpenTelemetryData.WithdrawalsCounter.Add(1);
            logger.LogInformation($"withdrew {amount} from {email} wallet");
            return Results.Ok(new { Message = "Withdrawal done successfully" });

        }
    }
}
