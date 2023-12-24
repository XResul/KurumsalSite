using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Areas.Panel.Controllers
{
    public class ProductsController : BaseController
    {

        // Product Detail da ProductCategoryName'ini gösteremedim
        //Product Edit'de ise DropDown Liste'te hata var 
        //               ////    /////////////////////////////////////////////////////////

        EntityModelContext db = new EntityModelContext();
        // GET: Panel/Products
        public ActionResult Index()
        {
            var products = db.Products.Include(p => p.ProductCategory).ToList();
            return View(products);
        }


        public ActionResult Create()
        {
            ViewBag.ProductCategoryID = new SelectList(db.productCategory, "ProductCategoryID", "ProductCategoryName");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create(Product product, HttpPostedFileBase image)
        {
            if (ModelState.IsValid)
            {
                if (image != null)
                {
                    WebLibrary.GraphicClass.ImageResizer ir = new WebLibrary.GraphicClass.ImageResizer();
                    Image img = Image.FromStream(image.InputStream);
                    string uzanti = Path.GetExtension(image.FileName);
                    Guid gd = Guid.NewGuid();

                    List<Image> images = ir.Resize(img, 800, 350);

                    ir.saveJpeg(Server.MapPath("/Uploads/image/" + gd.ToString() + uzanti), images[0], 100);
                    ir.saveJpeg(Server.MapPath("/Uploads/thumb/" + gd.ToString() + uzanti), images[1], 100);


                    product.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                    product.ThumbURL = "/Uploads/thumb/" + gd.ToString() + uzanti;
                }
                product.ProductDate = DateTime.Now;
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ProductCategoryID = new SelectList(db.productCategory, "ProductCategoryID", "ProductCategoryName", product.ProductCategoryID);
            return View();
        }


        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Product product = db.Products.Find(id);
            ViewBag.ProductCategoryID = new SelectList(db.productCategory, "ProductCategoryID", "ProductCategoryName");
            if (id == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit(Product product, HttpPostedFileBase image)
        {

            if (ModelState.IsValid)
            {
                if (image != null)
                {
                    WebLibrary.GraphicClass.ImageResizer ir = new WebLibrary.GraphicClass.ImageResizer();
                    Image img = Image.FromStream(image.InputStream);
                    string uzanti = Path.GetExtension(image.FileName);
                    Guid gd = Guid.NewGuid();

                    List<Image> images = ir.Resize(img, 800, 350);

                    ir.saveJpeg(Server.MapPath("/Uploads/image/" + gd.ToString() + uzanti), images[0], 100);
                    ir.saveJpeg(Server.MapPath("/Uploads/thumb/" + gd.ToString() + uzanti), images[1], 100);


                    product.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                    product.ThumbURL = "/Uploads/thumb/" + gd.ToString() + uzanti;
                }
                product.ProductDate = DateTime.Now;
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ProductCategoryID = new SelectList(db.productCategory, "ProductCategoryID", "ProductCategoryName", product.ProductCategoryID);
            return View(product);
        }





        public ActionResult Delete(int id)
        {
            Product product = db.Products.Find(id);
            product.IsActive = false;
            db.Entry(product).State = EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("index");
        }


        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Product product = db.Products.Find(id);
            ViewBag.products = db.Products.FirstOrDefault(c => c.ProductCategoryID == product.ProductID);
            if (id == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

    }
}