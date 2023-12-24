using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KurumsalSite.Models
{
    public class FooterViewModel
    {
        public List<Pages> LastPage { get; set; }
        public List<Product> OurProduct { get; set; }
        public List<Project> OurProjectG { get; set; }

        public Contact contact { get; set; }
        
        public Social Social { get; set; }

        public List<ProjectCategory> projectCategories { get; set; }

    }
}