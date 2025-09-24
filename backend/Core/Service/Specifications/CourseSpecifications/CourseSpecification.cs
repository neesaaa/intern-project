using DomainLayer.Models;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications.CourseSpecifications
{
    public class CourseSpecification:BaseSpecification<Course>
    {
        public CourseSpecification(SearchParams paramters)
        {
            AddInclude(c => c.Instructor);
            AddInclude(c => c.Sections);
            AddOrderByDesc(c => c.Rate);
            if (paramters.IsPagingEnabled)
            {
                ApplyPaging(paramters.Skip, paramters.Take);
            }

        }
    }
}
