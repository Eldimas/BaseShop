using System;
using System.Collections.Generic;

namespace PortalApp.API.Models
{
    public class Navig
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public string TitleEng { get; set; }
        public string TitleKaz { get; set; }
        
        public ICollection<Navig> Children { get; set; }
    }
}