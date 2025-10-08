using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.CourseDtos
{
    public class CourseDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string? ImageUrl { get; set; }
        public decimal Cost { get; set; }
        public decimal Rate { get; set; }
        public decimal TotalHours { get; set; }
        public string Certification { get; set; } = string.Empty;
        public Category Category { get; set; }

        public InstructorDto Instructor { get; set; } = default!;
        public ICollection<CourseSectionDto> Sections { get; set; } = new List<CourseSectionDto>();
        public Level Level { get; set; }


    }
}
