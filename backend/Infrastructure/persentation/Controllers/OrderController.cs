using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service_Abstraction;
using Shared.OrderModuledDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace persentation.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class OrderController(IOrderService service) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<OrderToReturnDto>> CreateOrder(OrderDto order){
            var email = User.FindFirstValue(ClaimTypes.Email);
            var orderRerturn = await service.CreateOrderAsync(order, email!);
            return Ok(orderRerturn);
        }

    }
}
