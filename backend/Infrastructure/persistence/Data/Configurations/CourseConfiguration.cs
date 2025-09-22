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
        internal class CourseConfiguration:BaseEntityConfigutaion<Course>
        {
            public override void Configure(EntityTypeBuilder<Course> builder)
            {
                base.Configure(builder);

                builder.Property(c => c.Cost)
                       .HasColumnType("decimal(18,2)");

                builder.Property(c => c.Category)
                       .HasConversion<string>();


            
            }
        }
    }
