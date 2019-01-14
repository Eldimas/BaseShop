using System;

namespace PortalApp.API.Models
{
    public class CategoryProduct
    {
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
    }
}