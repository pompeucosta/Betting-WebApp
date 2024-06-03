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
        FootballService footballService = new FootballService();

        [HttpPost("createBet"),Authorize]
        public async Task<IResult> CreateBet(CreateBetModel createBetModel, DataContext dbContext)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var id = dbContext.Users.Where(_u => _u.Email == email).First().Id;
            var user = dbContext.UsersList.Include(c => c.ApplicationUser).FirstOrDefault(c => c.ApplicationUser.Id == id);

            if (user == null)
            {
                return Results.NotFound(new { Message = "User not found" });
            }

            var fixtureExists = await footballService.CheckFixtureExists(createBetModel.FixtureID);
            if (!fixtureExists)
            {
                return Results.NotFound(new { Message = "Fixture not found"});
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
                    BetValue = createBetModel.BetValue,
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
        public async Task<IActionResult> GetBets(DataContext dbContext)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var userID = dbContext.Users.Where(_u => _u.Email == email).First().Id;

            var bets = dbContext.BetsList
                .Where(b => b.UserID == userID)
                .Select(b => new 
                { 
                    UserID = b.UserID,
                    BetID = b.BetID,
                    BetValue = b.BetValue,
                    FixtureID = b.FixtureID,
                    AmountPlaced = b.AmountPlaced,
                    GameData = footballService.GetFootballDataByFixtureID(b.FixtureID),
                    OddsData = footballService.GetFootballOddsByFixtureID(b.FixtureID),
                });
            if (bets == null)
            {
                return BadRequest(new { Message = "UserID does not have any bets associated" });
            }

            return Ok(new { Bets = bets });
        }

    }
}
