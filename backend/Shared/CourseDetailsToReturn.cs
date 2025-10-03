using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public class CourseDetailsToReturn
    {
        public CourseDetailsDto Course {  get; set; }
        public List<CourseCardDto> Top4 { get; set; }
    }
}
