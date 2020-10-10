using CourseApp.Core.DTOs;
using FluentValidation;

namespace CourseApp.Core.Validators
{
    public class UserRegistrationValidator : AbstractValidator<UserRegistrationDTO>
    {
        public UserRegistrationValidator()
        {
            RuleFor(c => c.FirstName).NotEmpty();
            RuleFor(c => c.LastName).NotEmpty();
            RuleFor(c => c.Email).NotEmpty().EmailAddress();
            RuleFor(c => c.Password).NotEmpty();
            RuleFor(c => c.ConfirmPassword).NotEmpty().Equal(c => c.Password);
        }
    }
}
