using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalApp.API.Helpers;
using PortalApp.API.Models;

namespace PortalApp.API.Data
{
    public class UserRepository : IUserRepository
    {
        public readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }
    }
}