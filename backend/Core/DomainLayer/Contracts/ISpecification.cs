using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Contracts
{
    public interface ISpecification <Entity> where Entity:BaseEntity
    {
        List<Expression<Func<Entity, bool>>> Criteria { get; }
        List<Expression<Func<Entity, object>>> Includeexpressions { get; }
        public Expression<Func<Entity, object>>? OrderBy { get; }
        public Expression<Func<Entity, object>>? OrderByDesc { get; }

        public int take { get; }
        public int skip { get; }
        public bool IsPagingEnabled { get; }
    }
}
