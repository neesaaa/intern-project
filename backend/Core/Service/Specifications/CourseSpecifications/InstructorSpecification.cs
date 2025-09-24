using DomainLayer.Models;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications.CourseSpecifications
{
    public class InstructorSpecification:BaseSpecification<Instructor>
    {
        public InstructorSpecification(CourseSearchParams paramters) {
            AddOrderByDesc(c => c.Rate);
            if (paramters.IsPagingEnabled)
            {
                ApplyPaging(paramters.Skip, paramters.Take);
            }
        }

    }
}
