using AutoMapper;
using DomainLayer.Contracts;
using DomainLayer.Models;
using Service.Specifications.CourseSpecifications;
using Service_Abstraction;
using Shared;
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
        public async Task<PaginatedResult<CourseCardDto>> GetAllCoursesAsync(CourseSearchParams parameters)
        {
            var Repo = _unit.GetRepo<Course>();
            var Spec=new CourseSpecification(parameters);
            var items= _mapper.Map<IEnumerable<Course>,IEnumerable<CourseCardDto>>(await Repo.GetAllAsync(Spec));
            var totalSpecs = new CourseTotalSpecs(parameters);
            var total = await Repo.CountAsync(totalSpecs);

            return new PaginatedResult<CourseCardDto>(parameters.Skip, parameters.Take, total, items);
      
             
        }

        public async Task<PaginatedResult<InstructorCardDto>> GetAllInstructorsAsync(CourseSearchParams parameters)
        {
            var Repo = _unit.GetRepo<Instructor>();
            var spec= new InstructorSpecification(parameters);
            var items = _mapper.Map<IEnumerable<Instructor>, IEnumerable<InstructorCardDto>>(await Repo.GetAllAsync(spec));

            var totalSpecs = new InstructorTotalSpecs(parameters);
            var total = await Repo.CountAsync(totalSpecs);

            return new PaginatedResult<InstructorCardDto>(parameters.Skip, parameters.Take, total, items);



        }
    }
}
