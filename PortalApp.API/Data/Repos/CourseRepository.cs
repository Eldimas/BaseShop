using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalApp.API.Models;

namespace PortalApp.API.Data.Repos
{
    public class CourseRepository : ICourseRepository
    {

        private readonly DataContext _context;

        public CourseRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Course>> getAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }
    }
}