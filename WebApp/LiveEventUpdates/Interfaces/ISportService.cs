namespace WebApp.LiveEventUpdates.Interfaces
{
    public interface ISportService
    {
        public Task<IEnumerable<ISportData>> GetLiveSportData();
    }
}
