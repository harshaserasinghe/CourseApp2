using CourseApp.Core.Entities;
using System.Collections.Generic;

namespace CourseApp.Data.Interfaces
{
    public interface ICourseRepository
    {
        Course GetById(int id);
        IEnumerable<Course> GetAll(string filter);
        Course Add(Course newCourse);
        void Update(Course updateCourse, Course existingCourse);
        void Remove(Course deleteCourse);
        int Commit();
    }
}
