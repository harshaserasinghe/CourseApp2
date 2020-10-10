using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.Web.Api
{
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("/error-development")]
        public IActionResult ErrorDevelopment()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            return Problem(title: context.Error.Message, detail: context.Error.StackTrace);
        }

        [Route("/error-production")]
        public IActionResult ErrorProduction()
        {
            return Problem(title: "Error", detail: "Error has occurred");
        }
    }
}
