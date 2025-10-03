using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Data.Configurations
{
    internal class InstructoConfigurations : BaseEntityConfigutaion<Instructor>
    {
        public override void Configure(EntityTypeBuilder<Instructor> builder)
        {
            base.Configure(builder);

            builder.Property(c => c.Rate)
                   .HasColumnType("decimal(8,2)");

        


        }
    }
}
