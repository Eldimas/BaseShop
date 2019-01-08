using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalApp.API.Data;
using PortalApp.API.Data.Repos;
using PortalApp.API.Dtos;
using PortalApp.API.Models;

namespace PortalApp.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ICourseRepository _courseRepo;
        private readonly IPortalRepository _portalRepository;
        private readonly IMapper _mapper;

        public CourseController(
            DataContext context, 
            ICourseRepository courseRepo,
            IPortalRepository portalRepository,
            IMapper mapper)
        {
            _context = context;
            _courseRepo = courseRepo;
            _portalRepository = portalRepository;
            _mapper = mapper;
            
        }

        [HttpGet("getAllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseRepo.getAllCourses();

            return Ok(courses);
        }

        [HttpPost("addCourse/{id}")]
        public async Task<IActionResult> AddCourse(int id, CourseDto courseDto)
        {
            // var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id);
            var course = _mapper.Map<Course>(courseDto);
            _portalRepository.Add(course);

            if (await _portalRepository.SaveAll())
            {
                var courseToReturn = _mapper.Map<CourseDto>(course);
                // return CreatedAtRoute("GetCourse", new {id = course.Id}, courseToReturn);
                return Ok(course);
            }

            // return Ok(course);
            throw new Exception("Creating the message failed on save");
        }
    }
}