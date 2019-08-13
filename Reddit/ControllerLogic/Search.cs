using Newtonsoft.Json;
using Reddit.Interfaces;
using Reddit.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Reddit.ControllerLogic
{
    public class Search : ISearch
    {
        public async Task<List<Result>> SubredditSearch(string subreddit)
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
                    foreach (Child x in _Data.Test.Children)
                    {
                        if (x.Data.Preview != null && x.Data.SecureMedia.Url != null)
                        {
                            foreach (Images y in x.Data.Preview.Images)
                            {
                                var resGroup = new Result();
                                resGroup.Id = x.Data.Id;
                                resGroup.Tag = x.Data.Title;
                                resGroup.Url = x.Data.SecureMedia.Url;
                                resGroup.Author = x.Data.Author;
                                resGroup.SubredditName = x.Data.SubredditName;
                                resGroup.Ups = x.Data.Ups;
                                resGroup.Downs = x.Data.Downs;
                                testList.Add(resGroup);
                            }
                        }
                        else if (x.Data.Preview != null && x.Data.SecureMedia.Url == null)
                        {
                            foreach (Images y in x.Data.Preview.Images)
                            {
                                var resGroup = new Result();
                                resGroup.Id = x.Data.Id;
                                resGroup.Tag = x.Data.Title;
                                resGroup.Url = y.Source.Url;
                                resGroup.Author = x.Data.Author;
                                resGroup.SubredditName = x.Data.SubredditName;
                                resGroup.Ups = x.Data.Ups;
                                resGroup.Downs = x.Data.Downs;
                                testList.Add(resGroup);
                            }
                        }
                    }
                    return testList;
                }
                else
                {
                    throw new ArgumentNullException("Error!");
                }
            }
        }
    }
}
