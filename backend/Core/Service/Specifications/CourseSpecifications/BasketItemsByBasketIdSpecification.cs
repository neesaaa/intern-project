using DomainLayer.Models.BasketModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications.CourseSpecifications
{
    internal class BasketItemsByBasketIdSpecification:BaseSpecification<BasketItem>
    {
        public BasketItemsByBasketIdSpecification(int basketId)
        {
            AddCriteria(bi => bi.BasketId == basketId);
        }
    
    }
}
