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
        Task<CourseDetailsToReturn>? GetCourseById(int id);
        Task<StatsDto> GetStats();
        Task DeleteInstructor(int id);
        Task<InstructorCardDto> UpdateOrAddAsync(AddOrUpdateInstructor instructor);
        Task<InstructorCardDto>? GetInstructorById(int id);
        Task<CourseCardDto> AddCourseAsync(AddOrUpdateCourseDto dto);
        Task<CourseCardDto> UpdateCourseAsync(int id, AddOrUpdateCourseDto dto);
        Task DeleteCourse(int id);


    }
}
