using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Contracts
{
    public interface IGenericRepo<T> where T: BaseEntity
    {
            Task<IEnumerable<T>> GetAllAsync();
            Task<IEnumerable<T>> GetAllAsync(ISpecification<T> specs);
            Task<T?> GetByIdAsync(int id);
            Task<T?> GetByIdAsync(int id,ISpecification<T> specs);

            Task<int> CountAsync(ISpecification<T> specs);
            Task AddAsync(T Entity);
            void Update(T Entity);
            void Remove(T Entity);
       

    }
}
