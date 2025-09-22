using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Contracts
{
    public interface IUnitOfWork
    {
        IGenericRepo<TEntity> GetRepo<TEntity>() where TEntity : BaseEntity; 
        Task<int> SaveChnagesAsync();
    }
}
