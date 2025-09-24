using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models
{
    public class Instructor:BaseEntity
    {
        public string Name { get; set; }= default!;
        public string Description { get; set; } = default!;
        public decimal Rate { get; set; }
        public string ImageUrl { get; set; } = default!;
        public Title Title { get; set; } 

    }
}
