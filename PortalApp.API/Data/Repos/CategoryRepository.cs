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
            var cats = _context.Categories;

            var allCats = _context.Categories.Include(x => x.Children);

            // if (lang != "ru")
            // {
            //     foreach (var item in allCats)
            //     {

            //         if (lang == "en")
            //         {
            //             item.Title = item.TitleEng;
            //         }
            //         else if (lang == "kz")
            //         {
            //             item.Title = item.TitleKaz;
            //         }

            //     }
            // }

            // var rootCategories = await _context.Categories.FromSql("SELECT * FROM Categories where CategoryId is null")
            // .Select(x => x.Id.Value).ToListAsync<Guid>();

            var rootCategories = await _context.Categories.FromSql("SELECT * FROM Categories where CategoryId is null")
            .Include(x => x.Children)
                .ThenInclude(x => x.Children)
                .ThenInclude(x => x.Children)
                .ThenInclude(x => x.Children)
                .ThenInclude(x => x.Children)
                .ThenInclude(x => x.Children)
                .ThenInclude(x => x.Children)
            .ToListAsync<Category>();

            
            // var allCategories = await _context.Categories.Include(x => x.Children).ToListAsync<Category>();

            // var allCategories = await _context.Categories.ToListAsync<Category>();

            // foreach (var cat in allCategories)
            // {
            //     if(cat.Children == null || cat.Children.Count == 0){
                  
            //        cat.Type = "item";

            //     } else {
            //         cat.Url = null;
            //         cat.Type = "collapsable";
            //     }
            // }


            // var lstCat = new List<Category>();
            // foreach (var root in rootCategories)
            // {
            //     lstCat.Add(allCategories.FirstOrDefault(x => x.Id == root));
            // }

            // foreach (var cat in lstCat)
            // {
            //     if(cat.Children.Count > 0){
            //         var childrens = cat.Children;
            //         cat.Children = new List<Category>();
            //         foreach (var ch in childrens)
            //         {
            //             cat.Children.Add(allCategories.FirstOrDefault(x => x.Id == ch.Id));
            //         }
            //     }
            // }


            // return lstCat;

            return rootCategories;
        }
    }
}