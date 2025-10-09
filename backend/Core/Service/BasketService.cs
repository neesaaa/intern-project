using AutoMapper;
using DomainLayer.Contracts;
using DomainLayer.Exceptions;
using DomainLayer.Models.BasketModule;
using Service.Specifications.CourseSpecifications;
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
            var basketItemRepo = _unit.GetRepo<BasketItem>();

            var basket = await basketRepo.GetByIdAsync(basketDto.Id);

            if (basket == null)
            {
                basket = new Basket { Id = basketDto.Id };
                await basketRepo.AddAsync(basket);
            }
            else
            {
                var spec = new BasketItemsByBasketIdSpecification(basketDto.Id);
                var existingItems = await basketItemRepo.GetAllAsync(spec);
                foreach (var item in existingItems)
                {
                    basketItemRepo.Remove(item);
                }
            }

            foreach (var itemDto in basketDto.Items)
            {
                var basketItem = _mapper.Map<BasketItem>(itemDto);
                basketItem.BasketId = basket.Id;
                await basketItemRepo.AddAsync(basketItem);
            }

            await _unit.SaveChnagesAsync();

            var basketWithItemsSpec = new BasketWithItemsSpecification(basketDto.Id);
            var updatedBasket = await basketRepo.GetByIdAsync(basketDto.Id, basketWithItemsSpec);
            return _mapper.Map<BasketDto>(updatedBasket);
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
