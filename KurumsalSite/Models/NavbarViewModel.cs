using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KurumsalSite.Models
{
    public class NavbarViewModel
    {
        public List<PageCategory> PageCategorys { get; set; }

        public List<Pages> pages { get; set; }


        public List<ProjectCategory> ProjectCategorys { get; set; }
        public List<Project> Projects { get; set; }

        public Contact ContactTake1 { get; set; }

        public Social SocialTake1 { get; set; }


        public List<ProductCategory> ProductCategorys { get; set; }
        public List<Product> Products { get; set; }
    }
}