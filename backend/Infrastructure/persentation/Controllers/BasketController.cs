using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service_Abstraction;
using Shared.BasketDtos;
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
        [Authorize]
        public class BasketController(IBasketService _basketService ):ControllerBase
        {
            private bool TryGetUserId(out int userId)
            {
                userId = 0;
                var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                return !string.IsNullOrEmpty(idClaim) && int.TryParse(idClaim, out userId);
            }

            [HttpGet]
            public async Task<ActionResult<BasketDto>> GetBasket() {
                if (!TryGetUserId(out var userId))
                    return Unauthorized();
                var basket= await _basketService.GetBasketAsync(userId);
                    return Ok(basket);
            }

            [HttpPost]
            public async Task<ActionResult<BasketDto>> CreateOrUpdateAsync(BasketDto basket)
            {

                    if (!TryGetUserId(out var userId))
                        return Unauthorized();
                    basket.Id = userId;
                    var basketUpdatedorCreated = await _basketService.CreateOrUpdateBasketAsync(basket);
                    return Ok(basketUpdatedorCreated);
             }

            [HttpDelete]
            public async Task<ActionResult<BasketDto>> DeleteAsync()
            {
                if (!TryGetUserId(out var userId))
                    return Unauthorized();
                var basketUpdatedorCreated = await _basketService.DeleteBasketAsync(userId);
                return Ok(basketUpdatedorCreated);
            }

        }
}
