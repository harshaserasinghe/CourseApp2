using AutoMapper;
using CourseApp.Core.DTOs;
using CourseApp.Core.Entities;

namespace CourseApp.Core.Mappers
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<UserRegistrationDTO, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

            CreateMap<User, UserDTO>();
        }
    }
}
