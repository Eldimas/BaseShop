using System.Collections.Generic;
using System.Threading.Tasks;
using PortalApp.API.Models;

namespace PortalApp.API.Data.Repos
{
    public interface ICourseRepository
    {
         Task<IEnumerable<Course>> getAllCourses();
    }
}