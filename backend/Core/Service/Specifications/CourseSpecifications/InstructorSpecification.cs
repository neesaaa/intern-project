using DomainLayer.Models;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications.CourseSpecifications
{
    public class InstructorSpecification:BaseSpecification<Instructor>
    {
        public InstructorSpecification(CourseSearchParams parameters) {
            AddOrderByDesc(c => c.Rate);
            if (parameters.IsPagingEnabled)
            {
                ApplyPaging(parameters.Skip, parameters.Take);
            }
            
            if (!string.IsNullOrEmpty(parameters.Filter))
            {
                    AddCriteria(c => c.Name.ToLower().Contains(parameters.Filter.ToLower()));
            }

        }

    }
}
