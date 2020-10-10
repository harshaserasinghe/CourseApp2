using CourseApp.Core.Entities;
using System;

namespace CourseApp.Core.DTOs

{
    public class CourseDTO
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
