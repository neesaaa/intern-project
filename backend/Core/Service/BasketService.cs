using AutoMapper;
using DomainLayer.Contracts;
using DomainLayer.Exceptions;
using DomainLayer.Models.BasketModule;
using Service_Abstraction;
using Shared.BasketDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class BasketService(IBasketRepo _repo,IMapper _mapper): IBasketService
    {
        public async Task<bool> DeleteBasketAsync(int id)
        {
            return await _repo.DeleteBasketAsync(id);
        }

        public async Task<BasketDto> GetBasketAsync(int id)
        {
            var basket = await _repo.GetBasketasync(id);
            if (basket is null)
            {
                var newBasket = new Basket { Id = id };
                await _repo.CreateOrUpdateBasketAsync(newBasket);
                return _mapper.Map<Basket, BasketDto>(newBasket);
            }
            return _mapper.Map<Basket,BasketDto>(basket);
        }

        public async Task<BasketDto> CreateOrUpdateBasketAsync(BasketDto basket)
        {
            var CustomerBasket = _mapper.Map<BasketDto, Basket>(basket);
            var created=await _repo.CreateOrUpdateBasketAsync(CustomerBasket);
            if (created is null)
                throw new Exception("something went wrong");
            return await GetBasketAsync(basket.Id);

        }
    }
} 
