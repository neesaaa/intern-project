using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.CourseDtos
{
    public class CourseCardDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string InstructorName { get; set; } = default!;
        public decimal Rate { get; set; }
        public int TotalLectures { get; set; }
        public decimal TotlaHours { get; set; }
        public decimal Cost { get; set; }
        public string? ImageUrl { get; set; }

    }
}
