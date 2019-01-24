using System;
using System.Collections.Generic;
using PortalApp.API.Models;

namespace PortalApp.API.Dtos
{
    public class ProductForUpdateDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ICollection<CategoryForUpdateProductDto> Categories { get; set; }
    }
}