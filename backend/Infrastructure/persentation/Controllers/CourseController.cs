using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("Stats")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> GetStats()
        {
            var stats= await _service.GetStats();
            return Ok(stats);

        }

        [HttpDelete("Instructor/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteInst(int id)
        {
            await _service.DeleteInstructor(id);
            return NoContent();

        }
        [HttpPost("Instructor/AddOrUpdate")]
        public async Task<IActionResult> InstructorsAddOrUpdate([FromBody]AddOrUpdateInstructor dto)
        {

            var result = await _service.UpdateOrAddAsync(dto);

            if (dto.Id.HasValue)
                return Ok(new { message = "Instructor updated successfully", data = result });

            return Ok(new { message = "Instructor Created successfully", data = result });

        }

        [HttpPost("Add")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCourse([FromForm] AddOrUpdateCourseDto dto)
        {
            var result = await _service.AddCourseAsync(dto);
            return Ok(new { message = "Course added successfully", data = result });
        }

        [HttpPut("Update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourse(int id, [FromForm] AddOrUpdateCourseDto dto)
        {
            var result = await _service.UpdateCourseAsync(id, dto);
            return Ok(new { message = "Course updated successfully", data = result });
        }


    }
}
