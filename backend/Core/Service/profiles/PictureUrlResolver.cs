using AutoMapper;
using DomainLayer.Models;
using Microsoft.Extensions.Configuration;
using Shared.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.profiles
{
    public class PictureUrlResolver : IValueResolver<Course, CourseCardDto, string?>
    {
        public PictureUrlResolver()
        {

        }
        public string Resolve(Course source, CourseCardDto destination, string destMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(source.ImageUrl))
                return string.Empty;
            var url = $"http://nassar1-001-site1.rtempurl.com/{source.ImageUrl}";
            return url;
        }
    }
}
