using System;

namespace PortalApp.API.Dtos
{
    public class CategoryForUpdateProductDto
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public string TitleEng { get; set; }
        public string TitleKaz { get; set; }
    }
}