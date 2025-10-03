using DomainLayer.Contracts;
using DomainLayer.Exceptions;
using DomainLayer.Models.BasketModule;
using Microsoft.AspNetCore.Http.HttpResults;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace persistence
{
    public class BasketRepo(IConnectionMultiplexer _connection) : IBasketRepo
    {
        private readonly IDatabase _database= _connection.GetDatabase();
        public async Task<Basket?> CreateOrUpdateBasketAsync(Basket basket, TimeSpan? TTL = null)
        {
            var basketJson=JsonSerializer.Serialize<Basket>(basket!);
            var res= await _database.StringSetAsync(basket.Id.ToString(), basketJson, TTL??TimeSpan.FromDays(1));
            if (res)
                return await GetBasketasync(basket.Id);
            return null;
        }

        public async Task<bool> DeleteBasketAsync(int id)
        {
            return await _database.KeyDeleteAsync(id.ToString());
        }

        public async Task<Basket?> GetBasketasync(int id)
        {
            var basket= await _database.StringGetAsync(id.ToString());
            if (basket.IsNullOrEmpty)
                return null ;
            return JsonSerializer.Deserialize<Basket>(basket!);
        }
    }
}
