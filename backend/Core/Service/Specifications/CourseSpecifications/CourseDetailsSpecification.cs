using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Specifications.CourseSpecifications
{
    public class CourseDetailsSpecification : BaseSpecification<Course>
    {
        public CourseDetailsSpecification()
        {
            AddInclude(c => c.Instructor);
            AddInclude(c => c.Sections);
        }

    }
}
