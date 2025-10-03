using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.OrderModuledDtos
{
    public class OrderDto
    {
        public int BasketId { get; set; }
        public OrderAdressDto Address { get; set; }
    }
}
