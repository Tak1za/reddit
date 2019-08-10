using System.Runtime.Serialization;

namespace Reddit.Models
{
    [DataContract]
        public class Source
        {
            [DataMember(Name = "url")]
            public string Url { get; set; }
        }
}