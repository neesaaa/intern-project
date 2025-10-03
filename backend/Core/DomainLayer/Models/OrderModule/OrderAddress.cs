using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models.OrderModule
{
    [Owned]
    public class OrderAddress
    {
        public string State { get; set; } = default!;
        public string Country { get; set; } = default!;
    }
}
