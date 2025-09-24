using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public class PaginatedResult<TEntity> 
    {

        public PaginatedResult(int pageIndex, int pageSize, int totalCount, IEnumerable<TEntity> items)
        {
            this.pageIndex = pageIndex;
            this.pageSize = pageSize;
            this.totalCount = totalCount;
            this.items = items;
        }

        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public int totalCount { get; set; }
        public IEnumerable<TEntity> items { get; set; }
    }
}
