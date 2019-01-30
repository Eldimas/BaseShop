using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalApp.API.Dtos;
using PortalApp.API.Models;

namespace PortalApp.API.Data.Repos
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        // private readonly PortalRepository _portalRepository;

        public CategoryRepository(DataContext context)
        {
            _context = context;
            // _portalRepository = portalRepository;
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

        public async Task<IEnumerable<Category>> GetCategoriesByProductId(Guid id)
        {
            var cats = await _context.CategoryProduct
                .Where(x => x.ProductId == id)
                .Include(x => x.Category)
                .Select(x => x.Category)
                .ToListAsync();
                return cats;
        }

        public async Task<Category> GetCategoryByLangById(string lang, Guid id)
        {
            var category = await _context.Categories
            // .Include(x => x.CategoryProducts)
            // .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == id);

            return category;
        }

        public async Task<IEnumerable<ProductForUpdateDto>> GetProductByCategoryId(string lang, Guid id)
        {
            var mainCategory = await _context.Categories
           .Include(x => x.Children)
               .ThenInclude(x => x.Children)
               .ThenInclude(x => x.Children)
               .ThenInclude(x => x.Children)
               .ThenInclude(x => x.Children)
               .ThenInclude(x => x.Children)
               .ThenInclude(x => x.Children)
           .FirstOrDefaultAsync(x => x.Id == id);

            var listGuid = new List<Guid>();
            listGuid.Add(mainCategory.Id.Value);
            if (mainCategory.Children.Count > 0)
            {
                listGuid = BuildCategoryList(mainCategory.Children, listGuid);
            }

            // var catProdList = await _context.CategoryProduct
            // .Where(x => listGuid.Contains(x.Category.Id.Value))
            // .Include(x => x.Product)
            // //.Include(x => x.Category)
            // .Select(x=> x.Product)
            // .ToListAsync();


            var catProdList = await _context.CategoryProduct
            .Where(x => listGuid.Contains(x.Category.Id.Value))
            .Include(x => x.Product)
            .Include(x => x.Category)
            //.Select(x=> x.Product)
            .ToListAsync();

            // var prodList = new List<Product>();
            // foreach (var prod in catProdList)
            // {
            //     if(!prodList.Contains(prod)) {
            //         prodList.Add(prod);
            //     }
            // }

            var prodIds = new List<Guid>();

            var prodForUpdateList = new List<ProductForUpdateDto>();

            foreach (var prod in catProdList)
            {
              if(!prodIds.Contains(prod.ProductId)) {

                  prodIds.Add(prod.Product.Id);

                  var prodForUpdate = new ProductForUpdateDto(){
                      Id = prod.Product.Id,
                      Title = prod.Product.Title,
                      Description = prod.Product.Description,
                      Price = prod.Product.Price,
                      Categories = new List<CategoryForUpdateProductDto>()
                  };

                  var cats = catProdList
                    .Where(x => x.ProductId == prodForUpdate.Id)
                    .Select(x => x.Category)
                    .ToList();

                    foreach (var cat in cats)
                    {
                        var catForUpdateProduct = new CategoryForUpdateProductDto() {
                            Id = cat.Id,
                            Title = cat.Title,
                            Type = cat.Type,
                            Icon = cat.Icon,
                            Url = cat.Url,
                            TitleEng = cat.TitleEng,
                            TitleKaz = cat.TitleKaz
                        };
                        prodForUpdate.Categories.Add(catForUpdateProduct);
                    }


                    prodForUpdateList.Add(prodForUpdate);
              }  
            }

            return prodForUpdateList;


            // var prodList = new List<ProductForUpdateDto>();
            // foreach (var prod in catProdList)
            // {
            //     var product = new ProductForUpdateDto();
            //     product.Id = prod.Product.Id;
            //     product.Title = prod.Product.Title;
            //     product.Price = prod.Product.Price;

               
            //     if (prodList.Count > 0)
            //     {
            //         foreach (var pr in prodList)
            //         {
            //             if (pr.Id == prod.Product.Id)
            //             {
            //                 var isExistCat = false;
            //                 if(product.Categories == null) {
            //                     product.Categories = new List<Category>();
            //                 }
            //                 foreach (var cat in product.Categories)
            //                 {
            //                     if (cat.Id == prod.Category.Id)
            //                     {
            //                         isExistCat = true;
            //                         // break;
            //                     }
            //                 }

            //                 if (!isExistCat)
            //                 {
            //                     product.Categories.Add(prod.Category);
            //                 }
            //             }
            //             else
            //             {
            //                 product.Categories = new List<Category>();
            //                 product.Categories.Add(prod.Category);

            //                 prodList.Add(product);
            //             }
            //         }
            //     } 
            //     // else
            //     // {
            //     //       product.Categories = new List<Category>();
            //     //             product.Categories.Add(prod.Category);

            //     //             prodList.Add(product);
            //     // }


            //     // if (!prodList.Contains(product))
            //     // {
            //     //     product.Categories = new List<Category>();
            //     //     product.Categories.Add(prod.Category);

            //     //     prodList.Add(product);
            //     // }
            //     // else
            //     // {
            //     //     // var cat = prod.Category;
            //     //     var isExistCat = false;
            //     //     foreach (var cat in product.Categories)
            //     //     {
            //     //         if (cat.Id == prod.Category.Id)
            //     //         {
            //     //             isExistCat = true;
            //     //             break;
            //     //         }
            //     //     }

            //     //     if (!isExistCat)
            //     //     {
            //     //         product.Categories.Add(prod.Category);
            //     //     }

            //     // }
            // }

            // return prodList;


        }

        public void  UpdateCategoryInProduct(CategoryProductUpdateDto categoryProduct)
        {
            // текущие категории продукта из базы
            var catProds = _context.CategoryProduct
                .Where(x=>x.ProductId == categoryProduct.ProductId)
                .ToList();

            // Удаляем категории
            var listForDelete = new List<Guid>();
            foreach (var cat in catProds)
            {
                var cp = categoryProduct.Categories
                    .FirstOrDefault(x => x == cat.CategoryId);

                var isExist = categoryProduct.Categories
                    .FirstOrDefault(x => x == cat.CategoryId) != Guid.Empty ? true : false;

                if(!isExist) {
                    //  var catProdModel = new CategoryProduct();
                   
                    // catProdModel.Category = _context.Categories
                    //     .FirstOrDefault(x => x.Id == cat.CategoryId);
                    // catProdModel.Product = _context.Products
                    //     .FirstOrDefault(x => x.Id == categoryProduct.ProductId);
                    var catProdModel = _context.CategoryProduct
                        .FirstOrDefault(x => x.CategoryId == cat.CategoryId 
                            && x.ProductId == categoryProduct.ProductId);
                    
                    if(catProdModel !=null ) {
                        _context.CategoryProduct.Remove(catProdModel);
                        _context.SaveChanges();
                    }

                    
                }
                
            }

            //Добавляем категории
            // цикл по новым категориям продукта
            foreach (var cat in categoryProduct.Categories)
            {
                var isExist = catProds.FirstOrDefault(x => x.CategoryId == cat) != null ? true: false;
                
                if(!isExist) {
                    var catProdModel = new CategoryProduct();
                    // catProdModel.CategoryId = cat;
                    // catProdModel.ProductId = categoryProduct.ProductId;

                    catProdModel.Category = _context.Categories.FirstOrDefault(x => x.Id == cat);
                    catProdModel.Product = _context.Products.FirstOrDefault(x => x.Id == categoryProduct.ProductId);



                    _context.CategoryProduct.Add(catProdModel);
                    // _portalRepository.Add<CategoryProduct>(catProdModel);
                }

                // await _portalRepository.SaveAll();
                 _context.SaveChanges();
            }
        }

        private List<Guid> BuildCategoryList(IEnumerable<Category> categories, List<Guid> listGuid)
        {


            foreach (var cat in categories)
            {
                listGuid.Add(cat.Id.Value);
                if (cat.Children.Count > 0)
                {
                    BuildCategoryList(cat.Children, listGuid);
                }
            }

            return listGuid;

        }
    }
}