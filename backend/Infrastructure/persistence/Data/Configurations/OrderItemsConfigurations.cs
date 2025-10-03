using DomainLayer.Models;
using DomainLayer.Models.OrderModule;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Data.Configurations
{
    internal class OrderItemsConfigurations:BaseEntityConfigutaion<OrderItem>
    {
        public override void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            base.Configure(builder);
            builder.ToTable("OrderItems");


            builder.Property(c => c.Cost)
                   .HasColumnType("decimal(8,2)");




        }
    }
}
