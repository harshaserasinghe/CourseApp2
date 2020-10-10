using System;

namespace CourseApp.Core.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CourseLevel Level { get; set; }
        public int Rating { get; set; }
        public string Category { get; set; }
        public string Author { get; set; }
        public DateTime PublishedDate { get; set; }
    }
}
