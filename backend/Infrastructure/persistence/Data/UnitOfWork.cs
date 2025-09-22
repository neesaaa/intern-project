using DomainLayer.Contracts;
using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Data
{
    public class UnitOfWork(StoreDbContext _context) : IUnitOfWork
    {
        private readonly Dictionary<String,object> repos = [];
        public IGenericRepo<TEntity> GetRepo<TEntity>() where TEntity : BaseEntity
        {
            var typename=typeof(TEntity).Name;
            if(repos.ContainsKey(typename))
                return (repos[typename]) as IGenericRepo<TEntity>;
            var repo = new GenericRepo<TEntity>(_context); 
            repos.Add(typename, repo);
            return repo;
        }

        public async Task<int> SaveChnagesAsync() => await _context.SaveChangesAsync();
    }
}
