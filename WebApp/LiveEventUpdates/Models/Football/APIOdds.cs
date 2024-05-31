namespace WebApp.LiveEventUpdates.Models.Football.Odds
{

    public class APIOddResponse
    {
        public string get { get; set; }
        public object[] parameters { get; set; }
        public object[] errors { get; set; }
        public int results { get; set; }
        public Paging paging { get; set; }
        public Response[] response { get; set; }
    }

    public class Paging
    {
        public int current { get; set; }
        public int total { get; set; }
    }

    public class Response
    {
        public Fixture fixture { get; set; }
        public League league { get; set; }
        public Teams teams { get; set; }
        public Status1 status { get; set; }
        public DateTime update { get; set; }
        public Odd[] odds { get; set; }
    }

    public class Fixture
    {
        public int id { get; set; }
        public Status status { get; set; }
    }

    public class Status
    {
        public string _long { get; set; }
        public int? elapsed { get; set; }
        public string seconds { get; set; }
    }

    public class League
    {
        public int id { get; set; }
        public int season { get; set; }
    }

    public class Teams
    {
        public Home home { get; set; }
        public Away away { get; set; }
    }

    public class Home
    {
        public int id { get; set; }
        public int goals { get; set; }
    }

    public class Away
    {
        public int id { get; set; }
        public int goals { get; set; }
    }

    public class Status1
    {
        public bool stopped { get; set; }
        public bool blocked { get; set; }
        public bool finished { get; set; }
    }

    public class Odd
    {
        public int id { get; set; }
        public string name { get; set; }
        public Value[] values { get; set; }
    }

    public class Value
    {
        public string value { get; set; }
        public string odd { get; set; }
        public string handicap { get; set; }
        public bool? main { get; set; }
        public bool suspended { get; set; }
    }
}
