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
        public CourseSpecification(CourseSearchParams parameters)
        {
            AddInclude(c => c.Instructor);
            AddInclude(c => c.Sections);

            AddOrderByDesc(c => c.Rate);

            if (parameters.IsPagingEnabled)
            {
                ApplyPaging(parameters.Skip, parameters.Take);
            }


            if (parameters.MinRating.HasValue)
            {
                AddCriteria(c => c.Rate >= parameters.MinRating.Value);
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
                var parts = parameters.LectureRange.Split('-');
                if (parts.Length == 2 &&
                    int.TryParse(parts[0], out var minLectures) &&
                    int.TryParse(parts[1], out var maxLectures))
                {
                    AddCriteria(c => c.Sections.Sum(s => s.LecturesNumber) >= minLectures &&
                                     c.Sections.Sum(s => s.LecturesNumber) <= maxLectures);
                }
                else
                {
                    AddCriteria(c => c.Sections.Sum(s => s.LecturesNumber) > 45);
                }
            }


            if (parameters.CategoryIds != null && parameters.CategoryIds.Any())
            {
                AddCriteria(c => parameters.CategoryIds.Contains((int)c.Category));
            }

            if (!string.IsNullOrWhiteSpace(parameters.Filter))
            {
                AddCriteria(c => c.Name.Contains(parameters.Filter) ||
                                 c.Description.Contains(parameters.Filter));
            }

            if (!string.IsNullOrWhiteSpace(parameters.OrderBy))
            {
                switch (parameters.OrderBy)
                {
                    case "Price":
                        AddOrderBy(c => c.Cost);
                        break;
                    case "Name":
                        AddOrderBy(c => c.Name);
                        break;
                    case "CreatedAt":
                        AddOrderBy(c => c.CreatedAt);
                        break;
                }
            }

            if (!string.IsNullOrWhiteSpace(parameters.OrderByDesc))
            {
                switch (parameters.OrderByDesc)
                {
                    case "Price":
                        AddOrderByDesc(c => c.Cost);
                        break;
                    case "Name":
                        AddOrderByDesc(c => c.Name);
                        break;
                    case "CreatedAt":
                        AddOrderByDesc(c => c.CreatedAt);
                        break;
                }
            }

        }
    }
}
