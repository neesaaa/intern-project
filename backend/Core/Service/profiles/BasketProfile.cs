using AutoMapper;
using DomainLayer.Models.BasketModule;
using Shared.BasketDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.profiles
{
    public class BasketProfile:Profile
    {
        public BasketProfile() {
            CreateMap<BasketItem, BasketItemDto>().ReverseMap();
            CreateMap<Basket, BasketDto>().ReverseMap();    
        }
    }
}
