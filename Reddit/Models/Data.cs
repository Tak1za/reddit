using System.Runtime.Serialization;

namespace Reddit.Models
{
    [DataContract]
    public class Data
    {
        [DataMember(Name = "subreddit")]
        public string Subreddit { get; set; }

        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "post_hint")]
        public string Type { get; set; }

        [DataMember(Name = "preview")]
        public Preview Preview { get; set; }

        [DataMember(Name = "secure_media_embed")]
        public SecureMedia SecureMedia { get; set; }

        [DataMember(Name = "author")]
        public string Author { get; set; }

        [DataMember(Name = "subreddit_name_prefixed")]
        public string SubredditName { get; set; }
    }
}