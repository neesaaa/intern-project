using DomainLayer.Models.BasketModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Contracts
{
    public interface IBasketRepo
    {
        Task<Basket?> GetBasketasync(int id);
        Task<Basket?> CreateOrUpdateBasketAsync(Basket basket, TimeSpan? TTL=null);
        Task<bool> DeleteBasketAsync(int id);
    }
}
