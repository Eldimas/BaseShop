using System;
using System.Collections.Generic;

namespace PortalApp.API.Dtos
{
    public class CategoryProductUpdateDto
    {
        public Guid ProductId { get; set; }
        public List<Guid> Categories { get; set; }
    }
}