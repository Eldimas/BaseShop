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

        public void SeedCourses()
        {

            if (!_context.Courses.Any())
            {
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


        public void SeedCategoryProduct()
        {

            if (!_context.CategoryProduct.Any())
            {
                var main_g = Guid.NewGuid();
                var g_1_1 = Guid.NewGuid();
                var g_1_2 = Guid.NewGuid();

                var catProd = new CategoryProduct();
                catProd.Category = new Category()
                {
                    Id = main_g,
                    Title = "Category_1",
                    TitleEng = "Category_1",
                    TitleKaz = "Category_1",
                    Type = "collapsable",
                    Icon = "edit",
                    Url = "/category/" + main_g,
                    Children = new List<Category>() {
                        new Category() {Id = g_1_1, Title = "Category_1_1", TitleEng = "Category_1_1", TitleKaz = "Category_1_1", Type = "item",  Url = "/category/" + g_1_1, Children = null},
                        new Category() {Id = g_1_2, Title = "Category_1_2", TitleEng = "Category_1_2", TitleKaz = "Category_1_2", Type = "item", Url = "/category/" + g_1_2, Children = null},
                }
                };

                var prodId = Guid.NewGuid();
                catProd.Product = new Product() {
                    Id = prodId,
                    Title = "Product 1",
                    Description = "Description 1",
                    Price = 10.1m
                };

                _context.CategoryProduct.Add(catProd);

                var catProd2 = new CategoryProduct(){
                    CategoryId = g_1_1,
                    ProductId = prodId
                };

                _context.CategoryProduct.Add(catProd2);

                _context.SaveChanges();
            }
        }
        public void SeedCategory()
        {
            if (!_context.Categories.Any())
            {
                var g_1_1 = Guid.NewGuid();
                var g_1_2 = Guid.NewGuid();

                var cats = new Category()
                {
                    Id = Guid.NewGuid(),
                    Title = "Category_1",
                    // TitleEng = "Category_1",
                    // TitleKaz = "Category_1",
                    Type = "collapsable",
                    Icon = "edit",
                    Url = null,
                    Children = new List<Category>() {
                        new Category() {Id = g_1_1, Title = "Category_1_1", TitleEng = "Category_1_1", TitleKaz = "Category_1_1", Type = "item",  Url = "/category/" + g_1_1, Children = null},
                        new Category() {Id = g_1_2, Title = "Category_1_2", TitleEng = "Category_1_2", TitleKaz = "Category_1_2", Type = "item", Url = "/category/" + g_1_2, Children = null},
                //   new Category() {Id = g_1_1, Title = "Category_1_1",  Type = "item",  Url = "/category/" + g_1_1, Children = null},
                //         new Category() {Id = g_1_2, Title = "Category_1_2",  Type = "item", Url = "/category/" + g_1_2, Children = null},
                }
                };

                _context.Categories.Add(cats);
                // _context.Navigs.Add(navig);

                _context.SaveChanges();


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