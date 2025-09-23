using DomainLayer.Contracts;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Data
{
    public class GenericRepo<T>(StoreDbContext _context) : IGenericRepo<T> where T : BaseEntity
    {
        public async Task AddAsync(T Entity) => await _context.Set<T>().AddAsync(Entity);

        public async Task<int> CountAsync(ISpecification<T> specs)
        {
            return await SpecificationEvaluator.CreateQuery(_context.Set<T>(), specs).CountAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync() => await _context.Set<T>().ToListAsync();

        public async Task<IEnumerable<T>> GetAllAsync(ISpecification<T> specs)
        {
              return await SpecificationEvaluator.CreateQuery(_context.Set<T>(),specs).ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id) => await _context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);

        public void Remove(T Entity) =>  _context.Set<T>().Remove(Entity);



        public void Update(T Entity) => _context.Set<T>().Update(Entity);



    }
}
