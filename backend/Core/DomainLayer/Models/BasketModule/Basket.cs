using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models.BasketModule
{
    public class Basket:BaseEntity
    {
        public ICollection<BasketItem> Items { get; set; } = [];
    }
}
