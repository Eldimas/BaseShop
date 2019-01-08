using System.Collections.Generic;
using System.Threading.Tasks;
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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _catRepo;
        private readonly DataContext _context;
        public CategoryController(DataContext context, ICategoryRepository catRepo)
        {
            _context = context;
            _catRepo = catRepo;

        }

        [HttpGet("getCategories/{lang}")]
        public async Task<IActionResult> GetCategories(string lang)
        {
            var cats = await _catRepo.GetCategoriesByLang(lang);
            return Ok(cats);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(CategoryUpdateDto categoryUpdateDto)
        {

            var parentNavig = await _context.Categories.FirstOrDefaultAsync(x => x.Id == categoryUpdateDto.ParentId);

            if (parentNavig == null)
            {
                return BadRequest("error");
            }

            if (parentNavig.Children == null)
            {
                parentNavig.Children = new List<Category>();
                parentNavig.Type = "group";
            }

            var newCat = new Category()
            {
                Id = categoryUpdateDto.Id,
                Title = categoryUpdateDto.Title,
                TitleEng = categoryUpdateDto.TitleEng,
                TitleKaz = categoryUpdateDto.TitleKaz,
                Icon = categoryUpdateDto.Icon,
                Type = "item",
                Url = categoryUpdateDto.Url
            };

            parentNavig.Children.Add(newCat);
            _context.SaveChanges();


            return Ok();
        }
    }
}