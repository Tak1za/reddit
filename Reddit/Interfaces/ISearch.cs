using Reddit.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reddit.Interfaces
{
    public interface ISearch
    {
        Task<List<Result>> SubredditSearch(string subreddit);
    }
}
