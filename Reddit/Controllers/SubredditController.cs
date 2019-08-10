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
using Reddit.Models;

namespace Reddit.Controllers
{
    [Route("api/r")]
    [ApiController]
    public class SubredditController : ControllerBase
    {
        [HttpGet("data/{subreddit}")]
        public async Task<IActionResult> GetData(string subreddit)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.reddit.com");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync($"/r/{subreddit}/.json?raw_json=1&limit=100");

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var _Data = JsonConvert.DeserializeObject<Root>(data);
                    var kind = _Data.Kind;
                    var testList = new List<Result>();
                    foreach(Child x in _Data.Test.Children)
                    {
                        if (x.Data.Preview != null && x.Data.SecureMedia.Url != null)
                        {
                            foreach (Images y in x.Data.Preview.Images)
                            {
                                var resGroup = new Result();
                                resGroup.Tag = x.Data.Title;
                                resGroup.Url = x.Data.SecureMedia.Url;
                                testList.Add(resGroup);
                            }
                        }
                        else if(x.Data.Preview != null && x.Data.SecureMedia.Url == null)
                        {
                            foreach (Images y in x.Data.Preview.Images)
                            {
                                var resGroup = new Result();
                                resGroup.Tag = x.Data.Title;
                                resGroup.Url = y.Source.Url;
                                testList.Add(resGroup);
                            }
                        }
                    }
                    return Ok(testList);
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