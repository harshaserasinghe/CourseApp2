using CourseApp.Core.DTOs;
using FluentValidation;

namespace CourseApp.Core.Validators
{

    public class CourseUpdateValidator : AbstractValidator<CourseUpdateDTO>
    {
        public CourseUpdateValidator()
        {
            RuleFor(c => c.Id).NotEmpty();
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.Level).NotEmpty();
            RuleFor(c => c.Rating).NotEmpty().InclusiveBetween(1, 5);
            RuleFor(c => c.Category).NotEmpty();
            RuleFor(c => c.Author).NotEmpty();
        }
    }
}
