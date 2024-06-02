using WebApp.LiveEventUpdates.Models.Football;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using WebApp.Auth.Models;
using WebApp.BettingTrans.Models;
using WebApp.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace WebApp.LiveEventUpdates.Controllers
{
    [Route("")]
    [ApiController]
    public class BetController : ControllerBase
    {
        [HttpPost("createBet"),Authorize]
        public async Task<IResult> CreateBet([FromBody] CreateBetModel createBetModel, [FromServices] DataContext dbContext)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var id = dbContext.Users.Where(_u => _u.Email == email).First().Id;
            var user = dbContext.UsersList.Include(c => c.ApplicationUser).FirstOrDefault(c => c.ApplicationUser.Id == id);

            if (user == null)
            {
                return Results.BadRequest(new { Message = "UserID does not exist" });
            }

            var wallet = user.Wallet;

            var withdrawalResult = wallet.Withdraw(createBetModel.AmountPlaced);

            if (!withdrawalResult)
            {
                return Results.BadRequest(new { Message = "Not enough funds" });
            }
            
            try
            {
                var bet = new Bet
                {
                    FixtureID = createBetModel.FixtureID,
                    AmountPlaced = createBetModel.AmountPlaced,
                    User = user,
                };
                user.BetList.Add(bet);

                // Save the changes to the database
                dbContext.BetsList.Add(bet);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Results.BadRequest(new { Message = ex.Message });
            }

            return Results.Ok(new { Message = "Bet created successfully" });
        }

        [HttpGet("getBets"),Authorize]
        public async Task<IActionResult> GetBets([FromServices] DataContext dbContext)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var userID = dbContext.Users.Where(_u => _u.Email == email).First().Id;
            
            var bets = dbContext.BetsList
                .Where(b => b.UserID == userID)
                .Select(b => new { UserID = b.UserID, BetID = b.BetID, FixtureID = b.FixtureID, AmountPlaced = b.AmountPlaced });
            if (bets == null)
            {
                return BadRequest(new { Message = "UserID does not have any bets associated" });
            }

            return Ok(new { Bets = bets });
        }

    }
}
