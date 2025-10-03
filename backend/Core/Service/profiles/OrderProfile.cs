using AutoMapper;
using DomainLayer.Models.OrderModule;
using Shared.OrderModuledDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.profiles
{
    public class OrderProfile:Profile
    {
        public OrderProfile() {
            CreateMap<OrderAddress, OrderAdressDto>();
            CreateMap<Order,OrderToReturnDto>();
            CreateMap<OrderItem,OrderItemDto>();
        }

    }
}
