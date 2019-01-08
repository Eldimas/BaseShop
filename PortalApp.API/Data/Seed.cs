using System.Collections.Generic;
using System.Linq;
using PortalApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;

namespace PortalApp.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly DataContext _context;

        public Seed(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            DataContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        public void SeedCourses() {
            
            if(!_context.Courses.Any()) {
                var coursesData = System.IO.File.ReadAllText("Data/JsonData/CourseSeedData.json");
                var courses = JsonConvert.DeserializeObject<List<Course>>(coursesData);

                foreach (var course in courses)
                {
                    _context.Courses.Add(course);
                }
                _context.SaveChanges();
            }
        }

        public void SeedUsers()
        {
            if (!_userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"},
                    new Role{Name = "Moderator"},
                    new Role{Name = "VIP"},
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    user.Photos.SingleOrDefault().IsApproved = true;
                    _userManager.CreateAsync(user, "password").Wait();
                    _userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var adminUser = new User
                {
                    UserName = "Admin"
                };

                IdentityResult result = _userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" }).Wait();
                }
            }
        }

        public void SeedMenu()
        {

            if (!_context.Navigs.Any())
            {

                var navigHome = new Navig()
                {
                    Id = Guid.NewGuid(),
                    Title = "Главная",
                    TitleEng = "Main",
                    TitleKaz = "Главная(Каз)",
                    Type = "item",
                    Icon = "home",
                    Url = "/home",
                    Children = null

                };

                var navigCourses = new Navig()
                {
                    Id = Guid.NewGuid(),
                    Title = "Курсы",
                    TitleEng = "CoursesEng",
                    TitleKaz = "Courses(Каз)",
                    Type = "item",
                    Icon = "home",
                    Url = "/courses",
                    Children = null

                };



                var navig2 = new Navig()
                {
                    Id = Guid.NewGuid(),
                    Title = "Админка",
                    TitleEng = "Administration",
                    TitleKaz = "AdministrationKaz",
                    Type = "collapsable",
                    Icon = "edit",
                    Url = null,
                    Children = new List<Navig>() {
                        new Navig() {Id = Guid.NewGuid(), Title = "Users", TitleEng = "UsersEng", TitleKaz = "UsersKaz", Type = "item", Icon = "person", Url = "/admin/admin-users", Children = null},

                        new Navig() {Id = Guid.NewGuid(), Title = "Редактирование меню", TitleEng = "Edit Menu", TitleKaz = "Edit Menu Kaz", Type = "item", Icon = "attach_money", Url = "/admin/edit-menu", Children = null},


                    }
                };

                _context.Navigs.Add(navigHome);
                _context.Navigs.Add(navigCourses);
                _context.Navigs.Add(navig2);
                // _context.Navigs.Add(navig);

                _context.SaveChanges();




            }
        }


    }
}