using DomainLayer.Models;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications.CourseSpecifications
{
    public class CourseTotalSpecs:BaseSpecification<Course>
    {
        public CourseTotalSpecs(CourseSearchParams parameters) {

            if (parameters is not null && parameters.Filter is not null)
            {
                AddCriteria(c=>c.Name.Contains(parameters.Filter));

            }
            
        }   
    }
}
