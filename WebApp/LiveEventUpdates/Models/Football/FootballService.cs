using WebApp.LiveEventUpdates.Interfaces;

namespace WebApp.LiveEventUpdates.Models.Football
{
    public class FootballService : ISportService
    {
        public async Task<IEnumerable<ISportData>> GetLiveSportData()
        {
            // Example. FOR TESTING PURPOSES ONLY
            FootballData[] fd =
            [
                new FootballData
                {
                    AwayGoals = 0,
                    HomeGoals = 3,
                    Status = "First Half",
                    Teams = [new Team { LogoURL = "url", Name = "benfica" }, new Team { LogoURL = "url2", Name = "porto" }],
                    TimeElapsed = 32
                },
                new FootballData
                {
                    AwayGoals = 2,
                    HomeGoals = 2,
                    Status = "Second Half",
                    Teams = [new Team { LogoURL = "u", Name = "boavista" }, new Team { LogoURL = "u2", Name = "ronaldo" }],
                    TimeElapsed = 87
                },
            ];
            return fd;
            return await RequestLiveDataAsync();
        }

        private async Task<IEnumerable<FootballData>> RequestLiveDataAsync()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all"),
                Headers =
                {
                    { "X-RapidAPI-Key", "SIGN-UP-FOR-KEY" },
                    { "X-RapidAPI-Host", "api-football-v1.p.rapidapi.com" },
                },
            };

            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var apiResponse = await response.Content.ReadFromJsonAsync<APIResponse>();
                var r = apiResponse.response;
                FootballData[] fd = new FootballData[r.Length];
                for (int i = 0; i < r.Length; i++)
                {
                    var game = r[i];
                    fd[i] = new FootballData
                    {
                        Teams = [new Team { LogoURL = game.teams.home.logo, Name = game.teams.home.name }, new Team { LogoURL = game.teams.away.logo, Name = game.teams.away.name }],
                        AwayGoals = (ushort)game.goals.away,
                        HomeGoals = (ushort)game.goals.home,
                        Status = game.fixture.status._long,
                        TimeElapsed = (uint)game.fixture.status.elapsed
                    };
                }

                return fd;
            }
        }
    }
}
