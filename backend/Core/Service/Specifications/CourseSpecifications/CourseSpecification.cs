using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
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
        public CourseSpecification(CourseSearchParams parameters)
        {
            AddInclude(c => c.Instructor);
            AddInclude(c => c.Sections);
            if (parameters.IsPagingEnabled)
            {
                ApplyPaging(parameters.Skip, parameters.Take);
            }
            if (parameters.CategoryIds?.Any() == true)
            {
                AddCriteria(c => parameters.CategoryIds.Contains((int)c.Category));
            }

            if (parameters.MinRating > 0)
            {
                AddCriteria(c => c.Rate >= parameters.MinRating);
            }

            if (parameters.MinPrice.HasValue)
            {
                AddCriteria(c => c.Cost >= parameters.MinPrice.Value);
            }
            if (parameters.MaxPrice.HasValue)
            {
                AddCriteria(c => c.Cost <= parameters.MaxPrice.Value);
            }

            if (!string.IsNullOrEmpty(parameters.LectureRange) && parameters.LectureRange != "all")
            {
                if (parameters.LectureRange.StartsWith("more-"))
                {
                    AddCriteria(c => c.Sections.Sum(s => s.LecturesNumber) >= 45);
                }
                else
                {
                    var parts = parameters.LectureRange.Split('-');
                    var min = int.Parse(parts[0]);
                    var max = int.Parse(parts[1]);

                    AddCriteria(c => c.Sections.Sum(s => s.LecturesNumber) >= min &&
                                     c.Sections.Sum(s => s.LecturesNumber) <= max);
                }
            }
            if (!string.IsNullOrEmpty(parameters.OrderByDesc))
            {
                if (parameters.OrderByDesc.Equals("Price", StringComparison.OrdinalIgnoreCase))
                    AddOrderByDesc(c => c.Cost);
                else if (parameters.OrderByDesc.Equals("CreatedAt", StringComparison.OrdinalIgnoreCase))
                    AddOrderByDesc(c => c.CreatedAt);
            }
            else if (!string.IsNullOrEmpty(parameters.OrderBy))
            {
                if (parameters.OrderBy.Equals("Price", StringComparison.OrdinalIgnoreCase))
                    AddOrderBy(c => c.Cost);
                else if (parameters.OrderBy.Equals("CreatedAt", StringComparison.OrdinalIgnoreCase))
                    AddOrderBy(c => c.CreatedAt);
            }




        }
    }
}
