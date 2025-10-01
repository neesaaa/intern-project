using Shared;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Abstraction
{
    public interface ICourseService
    {
        Task<PaginatedResult<CourseCardDto>> GetAllCoursesAsync(CourseSearchParams parameters);
        Task<PaginatedResult<InstructorCardDto>> GetAllInstructorsAsync(CourseSearchParams parameters);
        Task<CourseDetailsDto>? GetCourseById(int id);
    }
}
