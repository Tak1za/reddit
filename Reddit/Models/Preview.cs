using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Reddit.Models
{
    [DataContract]
        public class Preview
        {
            [DataMember(Name = "images")]
            public IEnumerable<Images> Images { get; set; }
        }
}