using AutoMapper;
using DomainLayer.Contracts;
using DomainLayer.Models;
using Service_Abstraction;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class CourseService(IUnitOfWork _unit,IMapper _mapper) : ICourseService
    {
        public async Task<IEnumerable<CourseCardDto>> GetAllCoursesAsync()
        {
            return _mapper.Map<IEnumerable<Course>,IEnumerable<CourseCardDto>>(await _unit.GetRepo<Course>().GetAllAsync());
             
        }
    }
}
