using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models.OrderModule
{
    public class Order:BaseEntity
    {
        public Order()
        {

        }
        public Order(string userEmail, OrderAddress address, ICollection<OrderItem> items, decimal subTotal)
        {
            UserEmail = userEmail;
            Address = address;
            Items = items;
            SubTotal = subTotal;
        }

        public string UserEmail { get; set; } = default!;
        public OrderAddress Address { get; set; } = default!;
        public ICollection<OrderItem> Items { get; set; } = []; 
        public decimal SubTotal { get; set; }
        public DateTimeOffset OrderDate { get; set; }=DateTimeOffset.Now;
        [NotMapped]
        public decimal Total => SubTotal * 1.15m;
    }
}
