using Microsoft.AspNetCore.Mvc;
using Service_Abstraction;
using Shared;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace persentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController(ICourseService _service): ControllerBase
    {
        [HttpGet("Courses")]
        public async Task<IActionResult> GetAllCoursesAsync([FromQuery] CourseSearchParams queryParams)
        {
            var PaginatedRes = await _service.GetAllCoursesAsync(queryParams);

            return Ok(PaginatedRes);
        }

        [HttpGet("Instructors")]
        public async Task<IActionResult> GetAllInstructorsAsync([FromQuery] CourseSearchParams queryParams)
        {
            var PaginatedRes = await _service.GetAllInstructorsAsync(queryParams);
            return Ok(PaginatedRes);
        }

        [HttpGet("Course/{id}")]
        public async Task<IActionResult> GetByIdDetailsPage(int id)
        {
            var courseDetails = await _service.GetCourseById(id);

            return Ok(courseDetails);
        }


    }
}
