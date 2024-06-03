namespace WebApp.LiveEventUpdates.Models.Football
{
    public class FootballData
    {
        public string Status { get; set; }
        public uint TimeElapsed { get; set; }
        public ushort HomeGoals { get; set; }
        public ushort AwayGoals { get; set; }
        public Team[] Teams { get; set; }

        public int FixtureID { get; set; }
    }

    public class Team
    {
        public string Name { get; set; }
        public string LogoURL { get; set; }
    }
}
