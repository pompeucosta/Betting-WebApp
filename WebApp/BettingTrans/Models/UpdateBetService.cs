using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WebApp.Data;
using WebApp.LiveEventUpdates.Models.Football;
using WebApp.LiveEventUpdates.Models.Football.Odds;

namespace WebApp.BettingTrans.Models
{
    public class BetService
    {
        public async Task UpdateBetData(DataContext dbContext, FootballService footballService)
        {
            var gameData = footballService.GetLiveSportData().Result;
            var odds = footballService.GetLiveEventOdds().Result;
            var bets = dbContext.BetsList;

            foreach (var game in gameData)
            {
                if(game.Status == "Finished")
                {
                    foreach (var bet in bets) 
                    {
                        if(bet.FixtureID == game.FixtureID)
                        {
                            var gameResult = getGameResult(game);
                            if(bet.BetValue == gameResult)
                            {
                                var oddValue = odds.Single(odd => odd.FixtureID == game.FixtureID)
                                            .Odds.First()
                                            .values.First(val => val.value == bet.BetValue);
                                var amount = bet.AmountPlaced;
                                var userID = bet.UserID;
                                var user = dbContext.UsersList.Include(u => u.ApplicationUser).SingleOrDefault(u => u.ApplicationUser.Id == userID);
                                if (user == null)
                                {
                                    continue;
                                }
                                var wallet = dbContext.WalletsList.SingleOrDefault(w => w.WalletId == user.WalletID);
                                if(wallet == null)
                                {
                                    continue;
                                }
                                
                                float totalAmount = float.Parse(oddValue.odd, CultureInfo.InvariantCulture) * amount;
                                wallet.Deposit(totalAmount);
                                
                                
                                dbContext.Update(wallet);
                            }
                            
                            dbContext.BetsList.Remove(bet);
                        }
                    }
                }
            }
            dbContext.SaveChanges();
        }

        public string getGameResult(FootballData game)
        {
            var gameResult = "Draw";
            if (game.HomeGoals > game.AwayGoals)
            {
                gameResult = "Home";
            }
            else if (game.HomeGoals < game.AwayGoals)
            {
                gameResult = "Away";
            }
            return gameResult;
        }
    }
}
