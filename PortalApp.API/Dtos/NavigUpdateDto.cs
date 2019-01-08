using System;
using System.Collections.Generic;

namespace PortalApp.API.Dtos
{
    public class NavigUpdateDto
    {
        public Guid Id { get; set; }
        public Guid ParentId { get; set; }
        public string Title { get; set; }
        public string TitleEng { get; set; }
        public string TitleKaz { get; set; }
        public string Type { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public ICollection<NavigUpdateDto> Children { get; set; }
        public bool Expanded { get; set; }
        public bool Selected { get; set; }
    }
}