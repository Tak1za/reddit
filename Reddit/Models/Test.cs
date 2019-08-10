using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Reddit.Models
{
    [DataContract]
        public class Test
        {
            [DataMember(Name = "modhash")]
            public string Modhash { get; set; }

            [DataMember(Name = "dist")]
            public int Dist { get; set; }

            [DataMember(Name = "children")]
            public IEnumerable<Child> Children { get; set; }
        }
}