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
