using LiveEventUpdates.Interfaces;

namespace LiveEventUpdates.Models.Football
{
    public class FootballData: ISportData
    {
        public string Status { get; set; }
        public uint TimeElapsed { get; set; }
        public ushort HomeGoals { get; set; }
        public ushort AwayGoals { get; set; }
        public Team[] Teams { get; set; }
    }
}
