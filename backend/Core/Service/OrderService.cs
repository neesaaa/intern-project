using AutoMapper;
using DomainLayer.Contracts;
using DomainLayer.Exceptions;
using DomainLayer.Models;
using DomainLayer.Models.OrderModule;
using Service_Abstraction;
using Shared.OrderModuledDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class OrderService(IBasketRepo _basket,IMapper _mapper ,IUnitOfWork _unit) : IOrderService
    {
        public async Task<OrderToReturnDto> CreateOrderAsync(OrderDto order, string email)
        {
            var OrderAddress=_mapper.Map<OrderAdressDto,OrderAddress>(order.Address);
            var basket =await  _basket.GetBasketasync(order.BasketId);
            if(basket is null)
                throw new BasketNotFoundexception(order.BasketId);

            List<OrderItem> OrderItems = [];
            var repo = _unit.GetRepo<Course>();
            foreach (var item in basket.Items)
            {
                var course = await repo.GetByIdAsync(item.Id) ?? throw new NotFoundCourse(item.Id);
                OrderItem orderItem = CretaeOrderitem(course);
                OrderItems.Add(orderItem);
            }
            var SubTotal = OrderItems.Sum(o => o.Cost);

            var Order=new Order(email, OrderAddress, OrderItems, SubTotal);
            var OrderRepo=_unit.GetRepo<Order>();
            await OrderRepo.AddAsync(Order);
            await _unit.SaveChnagesAsync();

            return _mapper.Map<Order, OrderToReturnDto>(Order);

        }

        private static OrderItem CretaeOrderitem(Course course)
        {
            return new OrderItem()
            {
                CourseId = course.Id,
                CourseName = course.Name,
                Cost = course.Cost,
                ImageUrl = course.ImageUrl,
            };
        }
    }
}
