using WebApp.LiveEventUpdates.Models.Football.Odds;

namespace WebApp.LiveEventUpdates.Models.Football
{
    public class FootballService
    {
        public async Task<IEnumerable<FootballData>> GetLiveSportData()
        {
            return await RequestLiveDataAsync();
        }
        public async Task<IEnumerable<FootballOdds>> GetLiveEventOdds()
        {
            return await RequestLiveOddsAsync();
        }
        private async Task<IEnumerable<FootballData>> RequestLiveDataAsync() 
        {
            FootballData[] fd =
            [
                new FootballData
                {
                    AwayGoals = 0,
                    HomeGoals = 3,
                    Status = "First Half",
                    Teams = [new Team { LogoURL = "url", Name = "benfica" }, new Team { LogoURL = "url2", Name = "porto" }],
                    TimeElapsed = 32,
                    FixtureID = 1
                },
                new FootballData
                {
                    AwayGoals = 2,
                    HomeGoals = 2,
                    Status = "Second Half",
                    Teams = [new Team { LogoURL = "u", Name = "boavista" }, new Team { LogoURL = "u2", Name = "ronaldo" }],
                    TimeElapsed = 87,
                    FixtureID = 2
                },
            ];
            return fd;
        }

        private async Task<IEnumerable<FootballOdds>> RequestLiveOddsAsync()
        {
            FootballOdds[] odds =
            [
                new FootballOdds
                {
                    FixtureID = 1,
                    Odds =
                    [
                        new Odd {
                            id = 59, name = "Fulltime Result", values = 
                            [
                                new Value { value = "0",odd = "1.006",handicap = null,main = null,suspended = false},
                                new Value { value = "1",odd = "29", handicap = null, main = null,suspended = false},
                                new Value { value = "2",odd = "81", handicap = null, main = null,suspended = false},
                            ]
                        },
                    ]
                },
                new FootballOdds
                {
                    FixtureID = 2,
                    Odds =
                    [
                        new Odd {
                            id = 59, name = "Fulltime Result", values =
                            [
                                new Value { value = "0",odd = "2",handicap = null,main = null,suspended = false},
                                new Value { value = "1",odd = "1.5", handicap = null, main = null,suspended = false},
                                new Value { value = "2",odd = "2", handicap = null, main = null,suspended = false},
                            ]
                        },
                    ]
                }
            ];

            return odds;
        }

    }
}
