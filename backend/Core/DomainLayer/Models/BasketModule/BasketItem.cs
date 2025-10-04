using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models.BasketModule
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string CourseName { get; set; } = default!;

        public string PictureUrl { get; set; } = default!;
        public int TotalHours { get; set; }
        public int TotalLectures { get; set; }
        public string InstructorName { get; set; } = default!;
        public decimal Cost { get; set; }
        public decimal Rate { get; set; }

    }
}
