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
    [Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class OrderController(IOrderService service) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<OrderToReturnDto>> CreateOrder(OrderDto order){
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (!TryGetUserId(out var userId))
                return Unauthorized();
            order.BasketId = userId;
            var orderRerturn = await service.CreateOrderAsync(order, email!);
            return Ok(orderRerturn);
        }
        private bool TryGetUserId(out int userId)
        {
            userId = 0;
            var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return !string.IsNullOrEmpty(idClaim) && int.TryParse(idClaim, out userId);
        }

    }
}
