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
    internal class BasketItemConfig: BaseEntityConfigutaion<BasketItem>
    {
        public override void Configure(EntityTypeBuilder<BasketItem> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                  .ValueGeneratedNever();



        }
    }
}
