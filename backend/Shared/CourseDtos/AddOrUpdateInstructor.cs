using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.CourseDtos
{
    public class AddOrUpdateInstructor
    {
        public int? Id { get; set; }
        public decimal Rate { get; set; }
        public string ImageUrl { get; set; } = default!;
        public string Name { get; set; } = default!;
        public Title Title { get; set; } = default!;
        public string Description { get; set; } = default!;
    }
}
