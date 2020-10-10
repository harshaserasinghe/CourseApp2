using CourseApp.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Data
{
    public class CourseDbContext : IdentityDbContext<User>
    {
        public CourseDbContext(DbContextOptions<CourseDbContext> options) : base(options)
        {

        }

        public DbSet<Course> Courses { get; set; }
    }
}
