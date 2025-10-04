using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.CourseDtos
{
    public class CourseSearchParams
    {
        private int _take = 10;
        private const int MaxPageSize = 50; 

        public int Take
        {
            get => _take;
            set => _take = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public string? Filter { get; set; }

        public string? OrderBy { get; set; }          
        public string? OrderByDesc { get; set; }


        public int Skip { get; set; } = 1;           

    
        public bool IsPagingEnabled { get; set; } = false;
        public int? MinRating { get; set; }     
        public string? LectureRange { get; set; } 
        public decimal? MinPrice { get; set; }    
        public decimal? MaxPrice { get; set; }    

        public List<int>? CategoryIds { get; set; } 



    }
}
