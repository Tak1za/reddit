using System.Runtime.Serialization;

namespace Reddit.Models
{
    [DataContract]
        public class Child
        {
            [DataMember(Name = "kind")]
            public string Child_Kind { get; set; }

            [DataMember(Name = "data")]
            public Data Data { get; set; }
        }
}