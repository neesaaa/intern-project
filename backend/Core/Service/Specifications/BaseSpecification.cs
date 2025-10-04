using DomainLayer.Contracts;
using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications
{
    public abstract class BaseSpecification<TEntity> : ISpecification<TEntity> where TEntity : BaseEntity
    {

        public List<Expression<Func<TEntity, bool>>>? CriteriaList { get; private set; } = [];

        public List<Expression<Func<TEntity, object>>> Includeexpressions { get; } = [];

        public Expression<Func<TEntity, object>>? OrderBy { get; private set; }

        public Expression<Func<TEntity, object>>? OrderByDesc { get; private set; }

        public int take  {get; set;}

        public int skip { get; set; }

        public bool IsPagingEnabled { get; set; } = false;

        protected void AddInclude(Expression<Func<TEntity, object>> Include)
        {
            Includeexpressions.Add(Include);

        }
        protected void AddOrderBy(Expression<Func<TEntity, object>> Order)
        {
            OrderBy= Order;
        }
        protected void AddOrderByDesc(Expression<Func<TEntity, object>> OrderDesc)
        {
            OrderByDesc = OrderDesc;
        }
        protected void AddCriteria(Expression<Func<TEntity, bool>> CriteriaExp) => CriteriaList.Add(CriteriaExp);
        protected void ApplyPaging(int index, int PageSize)
        {
            take = PageSize;
            skip = (index - 1) * PageSize;
            IsPagingEnabled = true;
        }
    }
}
