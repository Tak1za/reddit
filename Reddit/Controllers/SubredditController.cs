using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Reddit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubredditController : ControllerBase
    {
        [DataContract]
        public class Root
        {
            [DataMember(Name = "kind")]
            public string Kind { get; set; }

            [DataMember(Name = "data")]
            public Test Test { get; set; }
        }

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

        [DataContract]
        public class Child
        {
            [DataMember(Name = "kind")]
            public string Child_Kind { get; set; }

            [DataMember(Name = "data")]
            public Data Data { get; set; }
        }

        [DataContract]
        public class Data
        {
            [DataMember(Name = "subreddit")]
            public string Subreddit { get; set; }

            [DataMember(Name = "post_hint")]
            public string Type { get; set; }

            [DataMember(Name = "preview")]
            public Preview Preview { get; set; }
        }

        [DataContract]
        public class Preview
        {
            [DataMember(Name = "images")]
            public IEnumerable<Images> Images { get; set; }
        }

        [DataContract]
        public class Images
        {
            [DataMember(Name = "source")]
            public Source Source { get; set; }
        }

        [DataContract]
        public class Source
        {
            [DataMember(Name = "url")]
            public string Url { get; set; }
        }

        public class Result
        {
            public List<string> urlList { get; set; }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetData()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.reddit.com");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync("/r/itookapicture/.json?raw_json=1");

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var _Data = JsonConvert.DeserializeObject<Root>(data);
                    var kind = _Data.Kind;
                    var testList = new List<string>();
                    foreach(Child x in _Data.Test.Children)
                    {
                        foreach(Images y in x.Data.Preview.Images)
                        {
                            testList.Add(y.Source.Url);
                        }
                    }
                    var res = new Result();
                    res.urlList = testList;
                    return Ok(res);
                }
                else
                {
                    Console.WriteLine("Internal server Error");
                    return Ok();
                }
            }
        }
    }
}