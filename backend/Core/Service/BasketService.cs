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
    public class BasketService(IUnitOfWork _unit, IMapper _mapper): IBasketService
    {
    

        public async Task<BasketDto> GetBasketAsync(int id)
        {
            var basketRepo = _unit.GetRepo<Basket>();
            Basket basket;

            try
            {
                basket = await basketRepo.GetByIdAsync(id);
            }
            catch
            {
                basket = null;
            }

            if (basket == null)
            {
                var newBasket = new Basket
                {
                    Id = id,
                    CreatedAt = DateTime.UtcNow
                };

                await basketRepo.AddAsync(newBasket);
                await _unit.SaveChnagesAsync();

                return _mapper.Map<BasketDto>(newBasket);
            }

            return _mapper.Map<BasketDto>(basket);
        }

        public async Task<BasketDto> CreateOrUpdateBasketAsync(BasketDto basketDto)
        {
            var basketRepo = _unit.GetRepo<Basket>();
            var basket = await basketRepo.GetByIdAsync(basketDto.Id);

            if (basket == null)
            {
                basket = _mapper.Map<Basket>(basketDto);
                await basketRepo.AddAsync(basket);
            }
            else
            {
                _mapper.Map(basketDto, basket);
                basketRepo.Update(basket);
            }

            await _unit.SaveChnagesAsync();

            return _mapper.Map<BasketDto>(basket);
        }

        public async Task<bool> DeleteBasketAsync(int id)
        {
            var basketRepo = _unit.GetRepo<Basket>();
            var basket = await basketRepo.GetByIdAsync(id);

            if (basket == null) return false;

            basketRepo.Remove(basket);
            await _unit.SaveChnagesAsync();
            return true;
        }
    }
} 
