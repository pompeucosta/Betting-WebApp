using WebApp.LiveEventUpdates.Models.Football;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;

namespace WebApp.LiveEventUpdates.Controllers
{
    [Route("")]
    [ApiController]
    public class FootballController : ControllerBase
    {
        FootballService footballService = new FootballService();

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
    }
}
