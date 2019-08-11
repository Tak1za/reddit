namespace Reddit.Models
{
    public class Result{
        public string Tag {get; set;}
        public string Url {get; set;}
        public string Author { get; set; }
        public string SubredditName { get; set; }
        public int Ups { get; set; }
        public int Downs { get; set; }
    }
}