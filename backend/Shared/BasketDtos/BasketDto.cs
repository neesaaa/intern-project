    using System;
    using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace Shared.BasketDtos
    {
        public class BasketDto
        {
            public int Id { get; set; }

            public ICollection<BasketItemDto> Items { get; set; } = new List<BasketItemDto>();

         }
    }
