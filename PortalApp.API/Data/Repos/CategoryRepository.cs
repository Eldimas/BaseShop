using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalApp.API.Models;

namespace PortalApp.API.Data.Repos
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;

        public CategoryRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Category>> GetCategoriesByLang(string lang)
        {
            var allCats = _context.Categories;

            if (lang != "ru")
            {
                foreach (var item in allCats)
                {
                    if (lang == "en")
                    {
                        item.Title = item.TitleEng;
                    }
                    else if (lang == "kz")
                    {
                        item.Title = item.TitleKaz;
                    }

                }
            }

            var rootCategories = await _context.Categories.FromSql("SELECT * FROM Categories where CategoryId is null")
          .Select(x => x.Id.Value).ToListAsync<Guid>();



            var cats = await allCats
                 .Include(x => x.Children)
                .Where(x => rootCategories.Contains(x.Id.Value))
               .ToListAsync<Category>();

            return cats;  
        }
    }
}