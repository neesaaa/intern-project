using AutoMapper;
using DomainLayer.Contracts;
using DomainLayer.Exceptions;
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
    public class CourseService(IUnitOfWork _unit,IMapper _mapper, IFileService _fileService) : ICourseService
    {
        public async Task DeleteInstructor(int id)
        {
            var repo = _unit.GetRepo<Instructor>();
            var instructor = await repo.GetByIdAsync(id);
            if (instructor == null)
                throw new NotFoundInstructor(id); 

            repo.Remove(instructor);

            var result = await _unit.SaveChnagesAsync();
            if (result < 1)
                throw new Exception("error saving changes");
        }

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

        public async Task<CourseDetailsToReturn>? GetCourseById(int id)
        {
            var Repo = _unit.GetRepo<Course>();
            var spec = new CourseDetailsSpecification();
            var course = await Repo.GetByIdAsync(id, spec);

            if (course == null)
                throw new NotFoundCourse(id);

            var topCoursesParams = new CourseSearchParams
            {
                Skip = 1,
                Take = 4,
                OrderByDesc = "Rate",       
                IsPagingEnabled=true
            };
            var topCoursesPaginated = await GetAllCoursesAsync(topCoursesParams);


            return new CourseDetailsToReturn
            {
                Course = _mapper.Map<Course, CourseDetailsDto>(course),
                Top4 = (List<CourseCardDto>)topCoursesPaginated.items
            };

        }

        public async Task<InstructorCardDto>? GetInstructorById(int id)
        {
            var Repo = _unit.GetRepo<Instructor>();
            var instructor = await Repo.GetByIdAsync(id);

            if (instructor == null)
                return null;
            return _mapper.Map<Instructor, InstructorCardDto>(instructor); 


        }

        public async Task<StatsDto> GetStats()
        {
            var CourseRepo= _unit.GetRepo<Course>();
            var InstructorRepo= _unit.GetRepo<Instructor>();
            var Insspecs = new InstructorTotalSpecs(null);
            int totalInstructor = await InstructorRepo.CountAsync(Insspecs);
            var coursesSpec = new CourseTotalSpecs(null);
            int CoursesCount = await CourseRepo.CountAsync(coursesSpec);
            int Categories= Enum.GetValues(typeof(DomainLayer.Models.Category)).Length;
            return new StatsDto
            {
                Instructors = totalInstructor,
                Courses = CoursesCount,
                Categories = Categories
            };


        }

        public async Task<InstructorCardDto> UpdateOrAddAsync(AddOrUpdateInstructor dto)
        {
            var repo = _unit.GetRepo<Instructor>();

            if (dto.Id.HasValue)
            {
                var existing = await repo.GetByIdAsync(dto.Id.Value);
                if (existing == null)
                    throw new NotFoundInstructor(dto.Id.Value);

                _mapper.Map(dto, existing);

                repo.Update(existing);
                await _unit.SaveChnagesAsync();

                return _mapper.Map<Instructor, InstructorCardDto>(existing);
            }

            var newInstructor = _mapper.Map<AddOrUpdateInstructor, Instructor>(dto);
            await repo.AddAsync(newInstructor);
            await _unit.SaveChnagesAsync();

            return _mapper.Map<Instructor, InstructorCardDto>(newInstructor);
        }
        public async Task<CourseCardDto> AddCourseAsync(AddOrUpdateCourseDto dto)
        {
            var repo = _unit.GetRepo<Course>();
            var newCourse = _mapper.Map<AddOrUpdateCourseDto, Course>(dto);

            if (dto.ImageFile != null)
            {
                newCourse.ImageUrl = await _fileService.SaveImageAsync(dto.ImageFile, "Courses");
            }

            await repo.AddAsync(newCourse);
            await _unit.SaveChnagesAsync();

            return _mapper.Map<Course, CourseCardDto>(newCourse);
        }

        public async Task<CourseCardDto> UpdateCourseAsync(int id, AddOrUpdateCourseDto dto)
        {
            var repo = _unit.GetRepo<Course>();
            var existingCourse = await repo.GetByIdAsync(id, new CourseDetailsSpecification());

            if (existingCourse == null)
                throw new NotFoundCourse(id);

            if (dto.ImageFile != null)
            {
                if (!string.IsNullOrEmpty(existingCourse.ImageUrl))
                    await _fileService.DeleteImageAsync(existingCourse.ImageUrl);

                existingCourse.ImageUrl = await _fileService.SaveImageAsync(dto.ImageFile, "Courses");
            }

            _mapper.Map(dto, existingCourse);

            existingCourse.Sections.Clear();
            foreach (var sectionDto in dto.Sections)
            {
                var section = _mapper.Map<CourseSectionDto, CourseSection>(sectionDto);
                existingCourse.Sections.Add(section);
            }

            repo.Update(existingCourse);
            await _unit.SaveChnagesAsync();

            return _mapper.Map<Course, CourseCardDto>(existingCourse);
        }

    }
}
