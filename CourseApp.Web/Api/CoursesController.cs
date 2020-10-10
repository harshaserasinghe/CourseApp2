using AutoMapper;
using CourseApp.Core.DTOs;
using CourseApp.Core.Entities;
using CourseApp.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CourseApp.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        public ICourseRepository CourseRepository { get; private set; }
        public IMapper Mapper { get; }

        public CoursesController(
            ICourseRepository courseRepository,
            IMapper mapper)
        {
            CourseRepository = courseRepository;
            Mapper = mapper;
        }

        [HttpGet("{id}")]
        public ActionResult<Course> Get(int id)
        {
            var course = CourseRepository.GetById(id);
            var courseDTO = Mapper.Map<CourseDTO>(course);

            if (courseDTO == null)
            {
                return NotFound();
            }

            return Ok(courseDTO);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Course>> Get(string filter)
        {
            var courses = CourseRepository.GetAll(filter);
            var courseDTOs = Mapper.Map<IEnumerable<CourseDTO>>(courses);
            return Ok(courseDTOs);
        }

        [HttpPost]
        public IActionResult Post(CourseCreateDTO courseCreateDTO)
        {
            var newCourse = Mapper.Map<Course>(courseCreateDTO);
            newCourse.PublishedDate = DateTime.Now;
            CourseRepository.Add(newCourse);
            CourseRepository.Commit();
            return CreatedAtAction(nameof(Get), new { id = newCourse.Id }, newCourse);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, CourseUpdateDTO courseUpdateDTO)
        {
            if (id != courseUpdateDTO.Id)
            {
                return BadRequest();
            }

            var existingCourse = CourseRepository.GetById(id);

            if (existingCourse == null)
            {
                return NotFound();
            }

            var updateCourse = Mapper.Map<Course>(courseUpdateDTO);
            updateCourse.PublishedDate = existingCourse.PublishedDate;
            CourseRepository.Update(updateCourse, existingCourse);
            CourseRepository.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleteCourse = CourseRepository.GetById(id);

            if (deleteCourse == null)
            {
                return NotFound();
            }

            CourseRepository.Remove(deleteCourse);
            CourseRepository.Commit();
            return NoContent();
        }
    }
}
