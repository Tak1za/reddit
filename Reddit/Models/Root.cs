using System.Runtime.Serialization;

namespace Reddit.Models
{
    [DataContract]
        public class Root
        {
            [DataMember(Name = "kind")]
            public string Kind { get; set; }

            [DataMember(Name = "data")]
            public Test Test { get; set; }
        }
}