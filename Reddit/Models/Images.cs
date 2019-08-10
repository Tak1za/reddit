using System.Runtime.Serialization;

namespace Reddit.Models
{
    [DataContract]
        public class Images
        {
            [DataMember(Name = "source")]
            public Source Source { get; set; }
        }
}