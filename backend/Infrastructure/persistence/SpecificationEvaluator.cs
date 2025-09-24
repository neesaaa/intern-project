using DomainLayer.Contracts;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace persistence
{
    public static class SpecificationEvaluator
    {
        public static IQueryable<TEntity> CreateQuery<TEntity> (IQueryable<TEntity> Inputquery , ISpecification<TEntity> specs) where TEntity : BaseEntity
        {
            var query = Inputquery;

            if (specs.Includeexpressions.Count>0){
                query = specs.Includeexpressions.Aggregate(query, (current, include) => current.Include(include));
            
            }
            if (specs.OrderByDesc is not null)
            {
                query = query.OrderByDescending(specs.OrderByDesc);
            }
            else if (specs.OrderBy is not null)
            {
                query = query.OrderBy(specs.OrderBy);
            }
            if (specs.Criteria is not null)
            {
                query = query.Where(specs.Criteria);
            }
            if (specs.IsPagingEnabled)
            {
                query = query.Skip(specs.skip).Take(specs.take);
            }

            return query;

        }

    }
}
