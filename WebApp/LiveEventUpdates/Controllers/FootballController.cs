using WebApp.LiveEventUpdates.Models.Football;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.BettingTrans.Models;

namespace WebApp.LiveEventUpdates.Controllers
{
    [Route("")]
    [ApiController]
    public class FootballController : ControllerBase
    {
        static FootballService footballService = new FootballService();
        static BetService betService = new BetService();

        [HttpGet("getLiveData")]
        public async Task<IResult> GetLiveData()
        {
            using var myActivity = OpenTelemetryData.MyActivitySource.StartActivity("football live data");
            return Results.Ok(new { Data = await footballService.GetLiveSportData() });
        }

        [HttpGet("getLiveEventOdds")]
        public async Task<IResult> GetEventOdds(int fixtureID)
        {
            using var myActivity = OpenTelemetryData.MyActivitySource.StartActivity("football live odds");
            var odds = await footballService.GetLiveEventOdds();
            foreach (var odd in odds)
            {
                if (odd.FixtureID == fixtureID)
                {
                    return Results.Ok(new { Data = odd });
                }
            }

            return Results.BadRequest(new { Message = "Invalid FixtureID" });
        }

        [HttpPost("simulateDummyData")]
        public async Task<IResult> SimulateDummyData(bool state,DataContext dbContext,ILogger<FootballController> logger)
        {
            if (state == FootballService.state)
            {
                return Results.BadRequest(new { Message = "Data state remained the same"});
            }
            FootballService.state = state;
            betService.UpdateBetData(dbContext,footballService);
            await MQTT.PublishMessageAsync(logger, EnvVariables.BrokerAddress, "live-update", $"{state}");
            return Results.Ok(new { Message = "Data state successfully changed" });
        }
    }
}
