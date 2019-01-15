using System;
using System.Collections.Generic;

namespace PortalApp.API.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ICollection<CategoryProduct> CategoryProducts { get; set; }

    }
}