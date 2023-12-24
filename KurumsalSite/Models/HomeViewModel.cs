using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KurumsalSite.Models
{
    public class HomeViewModel
    {
        public List<Slider> sliders { get; set; }

        public Pages PageHakkimizda { get; set; }

        public List<ProductCategory> productCategories { get; set; }


        public List<Logos> Logoss { get; set; }

        public List<Project> Projects { get; set; }

        public List<Product> products { get; set; }

    }
}