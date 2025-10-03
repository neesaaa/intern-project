using Shared.BasketDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Abstraction
{
    public interface IBasketService
    {
        Task<BasketDto> GetBasketAsync(int id);
        Task<bool> DeleteBasketAsync(int id);
        Task<BasketDto> CreateOrUpdateBasketAsync(BasketDto basket);
    }
}
