using CourseApp.Core.Entities;

namespace CourseApp.Core.DTOs
{
    public class CourseCreateDTO
    {
        public string Name { get; set; }
        public CourseLevel Level { get; set; }
        public int Rating { get; set; }
        public string Category { get; set; }
        public string Author { get; set; }
    }
}
