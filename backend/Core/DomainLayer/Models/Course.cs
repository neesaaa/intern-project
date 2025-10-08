using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models
{
    public class Course : BaseEntity
    {
        [MaxLength(200)]
        public string Name { get; set; } = default!;

        [MaxLength(2000)]
        public string Description { get; set; } = default!;

        public int InstructorId { get; set; }
        public Instructor Instructor { get; set; } = null!; 

        public Category Category { get; set; } 

        public decimal Cost { get; set; } = 0;
        public decimal Rate { get; set; } = 0;
        public decimal TotalHours { get; set; } = 0;

        public string Certification { get; set; } = string.Empty;

        public ICollection<CourseSection> Sections { get; set; } = [];
        public string? ImageUrl { get; set; }
        public Level Level { get; set; } 


    }
}
