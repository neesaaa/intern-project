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
        public async Task<IActionResult> GetAllCoursesAsync([FromQuery] SearchParams queryParams)
        {
            var PaginatedRes = await _service.GetAllCoursesAsync(queryParams);

            return Ok(PaginatedRes);
        }
    }
}
