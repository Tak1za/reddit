using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Reddit.Models
{
    [DataContract]
    public class SecureMedia
    {
        [DataMember(Name = "media_domain_url")]
        public string Url { get; set; }
    }
}
