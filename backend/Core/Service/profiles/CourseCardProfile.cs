using AutoMapper;
using DomainLayer.Models;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.profiles
{
    public class CourseCardProfile : Profile
    {
        public CourseCardProfile()
        {
            CreateMap<Course, CourseCardDto>()
                .ForMember(dto => dto.ImageUrl, opt => opt.MapFrom(src =>
                string.IsNullOrEmpty(src.ImageUrl)
                    ? string.Empty
                    : $"https://localhost:7031/{src.ImageUrl}"))
                .ForMember(dest => dest.InstructorName, options => options.MapFrom(src => src.Instructor.Name))
                .ForMember(dest => dest.TotalLectures, options => options.MapFrom(src => src.Sections.Sum(x => x.LecturesNumber)));
            CreateMap<Instructor, InstructorCardDto>()
                                .ForMember(dto => dto.ImageUrl, opt => opt.MapFrom(src =>
                string.IsNullOrEmpty(src.ImageUrl)
                    ? string.Empty
                    : $"https://localhost:7031/{src.ImageUrl}"));

            CreateMap<Instructor, InstructorDto>()
                                .ForMember(dto => dto.ImageUrl, opt => opt.MapFrom(src =>
                string.IsNullOrEmpty(src.ImageUrl)
                    ? string.Empty
                    : $"https://localhost:7031/{src.ImageUrl}"));
            CreateMap<CourseSection, CourseSectionDto>().ReverseMap();
            CreateMap<Course, CourseDetailsDto>();

            CreateMap<AddOrUpdateInstructor, Instructor>()
                .ForMember(dest => dest.Id, opt => opt.Condition(src => src.Id.HasValue)) 
                .ForAllMembers(opt => opt.Condition((src, dest, val) => val != null)); 

            CreateMap<Instructor, AddOrUpdateInstructor>();
            CreateMap<AddOrUpdateCourseDto, Course>().ReverseMap();

        }
    }
}
