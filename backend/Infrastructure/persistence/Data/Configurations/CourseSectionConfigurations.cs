using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Data.Configurations
{
    internal class CourseSectionConfigurations: BaseEntityConfigutaion<CourseSection>
    {
        public override void Configure(EntityTypeBuilder<CourseSection> builder)
        {
            base.Configure(builder);

            builder.Property(c => c.TotalHours)
                   .HasColumnType("decimal(8,2)");
            builder.HasOne(cs => cs.Course)
                   .WithMany(c => c.Sections)
                   .HasForeignKey(cs => cs.CourseId)
                   .OnDelete(DeleteBehavior.Cascade);




        }
    }
}
