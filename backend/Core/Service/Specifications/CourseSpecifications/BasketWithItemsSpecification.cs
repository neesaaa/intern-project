using DomainLayer.Models;
using DomainLayer.Models.BasketModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications.CourseSpecifications
{
    public class BasketWithItemsSpecification : BaseSpecification<Basket>
    {
        public BasketWithItemsSpecification(int basketId)
        {
            AddInclude(b => b.Items);
            AddCriteria((b => b.Id == basketId));
        }
        public BasketWithItemsSpecification()
        {
            AddInclude(b => b.Items);
        }

    }
}
