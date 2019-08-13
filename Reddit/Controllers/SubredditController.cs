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
using Reddit.Interfaces;
using Reddit.Models;

namespace Reddit.Controllers
{
    [Route("api/r")]
    [ApiController]
    public class SubredditController : ControllerBase
    {
        private readonly ISearch _search;

        public SubredditController(ISearch search)
        {
            _search = search;
        }

        [HttpGet("data/{subreddit}")]
        public async Task<IActionResult> GetData(string subreddit)
        {
            var res = await _search.SubredditSearch(subreddit);
            return Ok(res);
        }
    }
}