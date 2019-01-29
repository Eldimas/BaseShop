using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PortalApp.API.Dtos;
using PortalApp.API.Models;

namespace PortalApp.API.Data.Repos
{
    public interface ICategoryRepository
    {
         Task<IEnumerable<Category>> GetCategoriesByLang(string lang);
         Task<Category> GetCategoryByLangById(string lang, Guid id);

         Task<IEnumerable<ProductForUpdateDto>> GetProductByCategoryId(string lang, Guid id);

         void UpdateCategoryInProduct(CategoryProductUpdateDto categoryProduct);
    }
}