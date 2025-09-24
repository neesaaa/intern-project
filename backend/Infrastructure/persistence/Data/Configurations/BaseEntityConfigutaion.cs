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
        internal abstract class BaseEntityConfigutaion<T> : IEntityTypeConfiguration<T> where T: BaseEntity
        {
            public virtual void Configure(EntityTypeBuilder<T> builder)
            {
                builder.HasKey(x => x.Id);
                builder.Property(x => x.CreatedAt).HasDefaultValueSql("GETDATE()")
                    .ValueGeneratedOnAdd();
            }
        }
    }
