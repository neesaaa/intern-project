using DomainLayer.Models;
using DomainLayer.Models.BasketModule;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Data.Configurations
{
    internal class BasketConfiguration : BaseEntityConfigutaion<Basket>
    {
        public override void Configure(EntityTypeBuilder<Basket> builder)
        {
            base.Configure(builder);

            builder.Property(b => b.Id)
                  .ValueGeneratedNever();

            builder.HasMany(b => b.Items)
                  .WithOne(i => i.Basket)
                  .HasForeignKey(i => i.BasketId)
                  .OnDelete(DeleteBehavior.Cascade);




        }
    
    }
}
