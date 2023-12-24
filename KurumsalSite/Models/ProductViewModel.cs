using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KurumsalSite.Models
{
    public class ProductViewModel
    {

        public List<ProductImage> ProductImages { get; set; }

        public Product Selected_Product { get; set; }

    }
}