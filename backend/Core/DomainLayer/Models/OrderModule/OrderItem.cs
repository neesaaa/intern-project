using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models.OrderModule
{
    public class OrderItem:BaseEntity
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; } = default!;
        public string ImageUrl { get; set; } = default!;
        public decimal Cost { get; set; }

        public Order Order { get; set; } = default!;
        public int OrderId { get; set; }


    }
}
