using System.ComponentModel;
using WebApp.BettingTrans.Models;
using WebApp.LiveEventUpdates.Models.Football.Odds;

namespace WebApp.LiveEventUpdates.Models.Football
{
    public class FootballService
    {
        public bool state;
        public async Task<IEnumerable<FootballData>> GetLiveSportData()
        {
            return await RequestLiveDataAsync();
        }
        public async Task<IEnumerable<FootballOdds>> GetLiveEventOdds()
        {
            return await RequestLiveOddsAsync();
        }

        public async Task<FootballData> GetFootballDataByFixtureID(int fixtureID)
        {
            var fixtures = await RequestLiveDataAsync();
            foreach (var fixture in fixtures)
            {
                if (fixture.FixtureID == fixtureID)
                {
                    return fixture;
                }
            }
            return null;
        }

        public async Task<FootballOdds> GetFootballOddsByFixtureID(int fixtureID)
        {
            var fixtures = await RequestLiveOddsAsync();
            foreach (var fixture in fixtures)
            {
                if (fixture.FixtureID == fixtureID)
                {
                    return fixture;
                }
            }
            return null;
        }

        public async Task<bool> CheckFixtureExists(int fixtureID)
        {
            var fixtures = await RequestLiveDataAsync();
            foreach (var fixture in fixtures)
            {
                if (fixture.FixtureID == fixtureID)
                {
                    return true;
                }
            }
            return false;
        }
        private async Task<IEnumerable<FootballData>> RequestLiveDataAsync() 
        {
            FootballData[] fd;
            if (state)
            {
                fd =
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
            fd =
            [
                new FootballData
                {
                    AwayGoals = 2,
                    HomeGoals = 32,
                    Status = "Second Half",
                    Teams = [new Team { LogoURL = "url", Name = "benfica" }, new Team { LogoURL = "url2", Name = "porto" }],
                    TimeElapsed = 48,
                    FixtureID = 1
                },
                new FootballData
                {
                    AwayGoals = 22,
                    HomeGoals = 24,
                    Status = "Finished",
                    Teams = [new Team { LogoURL = "u", Name = "boavista" }, new Team { LogoURL = "u2", Name = "ronaldo" }],
                    TimeElapsed = 90,
                    FixtureID = 2
                },
            ];
            return fd;
        }

        private async Task<IEnumerable<FootballOdds>> RequestLiveOddsAsync()
        {
            FootballOdds[] odds;

            if (state)
            {
                odds =
                [
                    new FootballOdds
                    {
                        FixtureID = 1,
                        Odds =
                        [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home",odd = "2.43",handicap = null,main = null,suspended = false},
                                    new Value { value = "Draw",odd = "2.84", handicap = null, main = null,suspended = false},
                                    new Value { value = "Away",odd = "3.08", handicap = null, main = null,suspended = false},
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
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home",odd = "2.40",handicap = null,main = null,suspended = false},
                                    new Value { value = "Draw",odd = "2.9", handicap = null, main = null,suspended = false},
                                    new Value { value = "Away",odd = "3.0", handicap = null, main = null,suspended = false},
                                ]
                            },
                        ]
                    }
                ];

                return odds;
            }

            odds =
                [
                    new FootballOdds
                    {
                        FixtureID = 1,
                        Odds =
                        [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home",odd = "2.13",handicap = null,main = null,suspended = false},
                                    new Value { value = "Draw",odd = "2.04", handicap = null, main = null,suspended = false},
                                    new Value { value = "Away",odd = "3.78", handicap = null, main = null,suspended = false},
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
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home",odd = "22.40",handicap = null,main = null,suspended = false},
                                    new Value { value = "Draw",odd = "244.9", handicap = null, main = null,suspended = false},
                                    new Value { value = "Away",odd = "355.0", handicap = null, main = null,suspended = false},
                                ]
                            },
                        ]
                    }
                ];

            return odds;
        }

    }
}
