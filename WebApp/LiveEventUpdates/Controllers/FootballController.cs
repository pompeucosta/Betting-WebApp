using WebApp.LiveEventUpdates.Interfaces;
using WebApp.LiveEventUpdates.Models.Football;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.LiveEventUpdates.Controllers
{
    [Route("")]
    [ApiController]
    public class FootballController : ControllerBase
    {
        FootballService footballService = new FootballService();

        [HttpGet("getLiveData")]
        public async Task<IEnumerable<ISportData>> GetLiveData()
        {
            return await footballService.GetLiveSportData();
        }
    }
}
