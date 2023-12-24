using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Areas.Panel.Controllers
{
    public class ProductImageController : BaseController
    {
        //PageCategory ve Page Kaldı

        EntityModelContext db=new EntityModelContext();
        // GET: Panel/ProductImage
        public ActionResult Index(int id)
        {
            var resimYakalama = db.ProductImages.Where(i => i.ProductID == id).ToList();
            return View(resimYakalama);
        }




        [HttpPost]
        public ActionResult AddImage(ProductImage imageProduct, HttpPostedFileBase image)
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


                imageProduct.ProductImageURL = "/Uploads/image/" + gd.ToString() + uzanti;

                imageProduct.ProductImageThumbURL = "/Uploads/thumb/" + gd.ToString() + uzanti;
            }
            db.ProductImages.Add(imageProduct);
            db.SaveChanges();
            return RedirectToAction("index", "ProductImage", new { id = imageProduct.ProductID });
        }


        public ActionResult Delete(int id)
        {
            var yakalama = db.ProductImages.Find(id);

            db.ProductImages.Remove(yakalama);
            db.SaveChanges();
            return RedirectToAction("index", "ProductImage", new { id = yakalama.ProductID });

        }
    }
}