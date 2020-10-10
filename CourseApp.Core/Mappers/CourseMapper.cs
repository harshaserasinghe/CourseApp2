using AutoMapper;
using CourseApp.Core.DTOs;
using CourseApp.Core.Entities;

namespace CourseApp.Core.Mappers
{
    public class CourseMapper : Profile
    {
        public CourseMapper()
        {
            CreateMap<Course, CourseDTO>();

            CreateMap<CourseCreateDTO, Course>();

            CreateMap<CourseUpdateDTO, Course>();
        }
    }
}
