using System.ComponentModel;
using WebApp.BettingTrans.Models;
using WebApp.LiveEventUpdates.Models.Football.Odds;

namespace WebApp.LiveEventUpdates.Models.Football
{
    public class FootballService
    {
        public static bool state { get; set; }
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
                fd = [
                    new FootballData { AwayGoals = 0, HomeGoals = 3, Status = "First Half", Teams = [new Team { LogoURL = "url", Name = "SL Benfica" }, new Team { LogoURL = "url2", Name = "FC Porto" }], TimeElapsed = 44, FixtureID = 1 },
                    new FootballData { AwayGoals = 2, HomeGoals = 2, Status = "Second Half", Teams = [new Team { LogoURL = "u", Name = "Boavista FC" }, new Team { LogoURL = "u2", Name = "Sporting CP" }], TimeElapsed = 50, FixtureID = 2 },
                    new FootballData { AwayGoals = 0, HomeGoals = 0, Status = "Not Started", Teams = [new Team { LogoURL = "slovenia_url", Name = "Slovenia" }, new Team { LogoURL = "armenia_url", Name = "Armenia" }], TimeElapsed = 0, FixtureID = 3 },
                    new FootballData { AwayGoals = 0, HomeGoals = 0, Status = "Not Started", Teams = [new Team { LogoURL = "spain_url", Name = "Spain" }, new Team { LogoURL = "estonia_url", Name = "Estonia" }], TimeElapsed = 0, FixtureID = 4 },
                    new FootballData { AwayGoals = 0, HomeGoals = 0, Status = "Not Started", Teams = [new Team { LogoURL = "romania_url", Name = "Romania" }, new Team { LogoURL = "bulgaria_url", Name = "Bulgaria" }], TimeElapsed = 0, FixtureID = 5 },
                    new FootballData { AwayGoals = 0, HomeGoals = 0, Status = "Not Started", Teams = [new Team { LogoURL = "portugal_url", Name = "Portugal" }, new Team { LogoURL = "finland_url", Name = "Finland" }], TimeElapsed = 0, FixtureID = 6 },
                    new FootballData { AwayGoals = 0, HomeGoals = 0, Status = "Not Started", Teams = [new Team { LogoURL = "austria_url", Name = "Austria" }, new Team { LogoURL = "serbia_url", Name = "Serbia" }], TimeElapsed = 0, FixtureID = 7 },
                    new FootballData { AwayGoals = 0, HomeGoals = 0, Status = "Not Started", Teams = [new Team { LogoURL = "slovakia_url", Name = "Slovakia" }, new Team { LogoURL = "san_marino_url", Name = "San Marino" }], TimeElapsed = 0, FixtureID = 8 },
                    new FootballData { AwayGoals = 0, HomeGoals = 0, Status = "Not Started", Teams = [new Team { LogoURL = "norway_url", Name = "Norway" }, new Team { LogoURL = "kosovo_url", Name = "Kosovo" }], TimeElapsed = 0, FixtureID = 9 }
                ];
                return fd;
            }

            fd = [
                new FootballData { AwayGoals = 3, HomeGoals = 3, Status = "Second Half", Teams = [new Team { LogoURL = "url", Name = "SL Benfica" }, new Team { LogoURL = "url2", Name = "FC Porto" }], TimeElapsed = 76, FixtureID = 1 },
                new FootballData { AwayGoals = 4, HomeGoals = 2, Status = "Finished", Teams = [new Team { LogoURL = "u", Name = "Boavista FC" }, new Team { LogoURL = "u2", Name = "Sporting CP" }], TimeElapsed = 90, FixtureID = 2 },
                new FootballData { AwayGoals = 1, HomeGoals = 0, Status = "First Half", Teams = [new Team { LogoURL = "slovenia_url", Name = "Slovenia" }, new Team { LogoURL = "armenia_url", Name = "Armenia" }], TimeElapsed = 21, FixtureID = 3 },
                new FootballData { AwayGoals = 4, HomeGoals = 1, Status = "Second Half", Teams = [new Team { LogoURL = "spain_url", Name = "Spain" }, new Team { LogoURL = "estonia_url", Name = "Estonia" }], TimeElapsed = 56, FixtureID = 4 },
                new FootballData { AwayGoals = 2, HomeGoals = 2, Status = "First Half", Teams = [new Team { LogoURL = "romania_url", Name = "Romania" }, new Team { LogoURL = "bulgaria_url", Name = "Bulgaria" }], TimeElapsed = 12, FixtureID = 5 },
                new FootballData { AwayGoals = 2, HomeGoals = 5, Status = "Second Half", Teams = [new Team { LogoURL = "portugal_url", Name = "Portugal" }, new Team { LogoURL = "finland_url", Name = "Finland" }], TimeElapsed = 89, FixtureID = 6 },
                new FootballData { AwayGoals = 2, HomeGoals = 2, Status = "First Half", Teams = [new Team { LogoURL = "austria_url", Name = "Austria" }, new Team { LogoURL = "serbia_url", Name = "Serbia" }], TimeElapsed = 25, FixtureID = 7 },
                new FootballData { AwayGoals = 1, HomeGoals = 0, Status = "Finished", Teams = [new Team { LogoURL = "slovakia_url", Name = "Slovakia" }, new Team { LogoURL = "san_marino_url", Name = "San Marino" }], TimeElapsed = 90, FixtureID = 8 },
                new FootballData { AwayGoals = 3, HomeGoals = 1, Status = "Finished", Teams = [new Team { LogoURL = "norway_url", Name = "Norway" }, new Team { LogoURL = "kosovo_url", Name = "Kosovo" }], TimeElapsed = 90, FixtureID = 9 }
            ];

            return fd;
        }


        private async Task<IEnumerable<FootballOdds>> RequestLiveOddsAsync()
        {
            FootballOdds[] odds;

            if (state)
            {
                odds = [
                    new FootballOdds
                    {
                        FixtureID = 1,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "2.43", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "2.84", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "4.08", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 2,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "3.40", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "2.9", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "1.8", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 3,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.38", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "4.47", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "7.15", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 4,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.15", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "6.70", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "14.75", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 5,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.58", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "3.45", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "5.90", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 6,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.16", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "6.65", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "13.50", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 7,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.02", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "15.00", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "30.00", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 8,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.39", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "4.27", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "7.25", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 9,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.84", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "3.40", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "3.98", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    }
                ];

                return odds;
            }
            else
            {
                odds = [
                    new FootballOdds
                    {
                        FixtureID = 1,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "2.13", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "2.04", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "2.38", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 2,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "6.40", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "5.9", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "1.7", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 3,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "2.58", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "1.80", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "2.10", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 4,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "5.80", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "4.65", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "1.20", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 5,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "2.02", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "2.00", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "3.20", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 6,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.39", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "27.27", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "30.25", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 7,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "1.84", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "2.20", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "2.38", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 8,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "5.30", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "2.00", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "1.80", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    },
                    new FootballOdds
                    {
                        FixtureID = 9,
                        Odds = [
                            new Odd {
                                id = 1, name = "Match Winner", values =
                                [
                                    new Value { value = "Home", odd = "3.67", handicap = null, main = null, suspended = false },
                                    new Value { value = "Draw", odd = "2.00", handicap = null, main = null, suspended = false },
                                    new Value { value = "Away", odd = "1.89", handicap = null, main = null, suspended = false },
                                ]
                            },
                        ]
                    }
                ];

                return odds;
            }

        }


    }
}
