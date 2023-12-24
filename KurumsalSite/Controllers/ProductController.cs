using KurumsalEntityLayer.Entity;
using KurumsalSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Controllers
{
    public class ProductController : Controller
    {
        EntityModelContext db = new EntityModelContext();
        // GET: Product
        public ActionResult Index()
        {
            HomeViewModel model = new HomeViewModel();
            model.products = db.Products.ToList();

            return View(model);
        }

        public ActionResult ProductDetail(int id)
        {
            Product productFind = db.Products.Find(id);

            productFind.ProductImages = db.ProductImages.ToList();

            return View(productFind);
        }

        public ActionResult ProductImageDetail(int id)
        {
            //ProductImage productImage = db.ProductImages.Where(p => p.ProductImageID == id).ToList();

            ProductViewModel model = new ProductViewModel();
            model.ProductImages = db.ProductImages.Where(p => p.ProductID == id).ToList();

            model.Selected_Product = db.Products.Where(p => p.ProductID == id).Take(1).FirstOrDefault();



            return View(model);
        }

    }
}