using WebApp.LiveEventUpdates.Models.Football.Odds;

namespace WebApp.LiveEventUpdates.Models.Football
{
    public class FootballOdds
    {
        public int FixtureID { get; set; }
        public IEnumerable<Odd> Odds { get; set; }
    }
}
