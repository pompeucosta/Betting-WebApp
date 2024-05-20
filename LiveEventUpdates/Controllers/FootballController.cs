using LiveEventUpdates.Interfaces;
using LiveEventUpdates.Models.Football;
using Microsoft.AspNetCore.Mvc;

namespace LiveEventUpdates.Controllers
{
    [Route("")]
    [ApiController]
    public class FootballController : ControllerBase
    {
        FootballService footballService = new FootballService();

        [HttpGet("GetLiveData")]
        public async Task<IEnumerable<ISportData>> GetLiveData()
        {
            return await footballService.GetLiveSportData();
        }
    }
}
