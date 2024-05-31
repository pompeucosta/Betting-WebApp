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
                            id = 1, name = "Which team will score the 2nd goal?", values = 
                            [
                                new Value { value = "1",odd = "0",handicap = null,main = null,suspended = true},
                                new Value { value = "No goal",odd = "0", handicap = null, main = null,suspended = true},
                            ]
                        },
                        new Odd {
                            id = 10, name = "To Qualify", values =
                            [
                                new Value {value = "1", odd = "2.25",handicap = null,main = null,suspended = false},
                                new Value {value = "2", odd = "1.571",handicap = null, main = null,suspended = false}
                            ]
                        }
                    ]
                },
                new FootballOdds
                {
                    FixtureID = 2,
                    Odds =
                    [
                        new Odd {
                            id = 90, name = "Which team will score the 3rd goal?", values =
                            [
                                new Value {value = "1", odd = "0", handicap = null,main = null,suspended = true},
                                new Value {value = "No goal", odd = "0", handicap = null, main = null, suspended = true}
                            ]
                        }
                    ]
                }
            ];

            return odds;
        }

    }
}
