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
    public class LogoController : BaseController
    {
        //Logo Sayfasının düzenlemesin de kaldık buradan devam edeceğiz...
        //Logo controller 'ı bitti
        EntityModelContext db=new EntityModelContext();
        // GET: Panel/Logo
        public ActionResult Index()
        {
            return View(db.Logos.ToList());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Logos logos,HttpPostedFileBase image)
        {
            if (ModelState.IsValid)
            {
                if (image != null)
                {
                    Image img = Image.FromStream(image.InputStream);

                    Guid gd = Guid.NewGuid();

                    string uzanti = Path.GetExtension(image.FileName);

                    WebLibrary.GraphicClass.ImageResizer ir = new WebLibrary.GraphicClass.ImageResizer();
                    List<Image> lstimage = ir.Resize(img, 800, 350);

                    ir.saveJpeg(Server.MapPath("/Uploads/image/" + gd.ToString() + uzanti), lstimage[0], 100);

                    logos.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.Logos.Add(logos);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(logos);

        }

        [HttpGet]
        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();  
            }
            Logos logos = db.Logos.Find(id);
            if (logos == null)
            {
                return HttpNotFound();
            }
            return View(logos); 
        }

        [HttpGet]
        public ActionResult Edit(int? id)
        {

            if (id == null)
            {
                return HttpNotFound();
            }
            Logos logos = db.Logos.Find(id);
            if (logos == null)
            {
                return HttpNotFound();
            }
            return View(logos);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Logos logos,HttpPostedFileBase image)
        {

            if (ModelState.IsValid)
            {
                if (image != null)
                {
                    Image img = Image.FromStream(image.InputStream);

                    Guid gd = Guid.NewGuid();

                    string uzanti = Path.GetExtension(image.FileName);

                    WebLibrary.GraphicClass.ImageResizer ir = new WebLibrary.GraphicClass.ImageResizer();
                    List<Image> lstimage = ir.Resize(img, 800, 350);

                    ir.saveJpeg(Server.MapPath("/Uploads/image/" + gd.ToString() + uzanti), lstimage[0], 100);

                    logos.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.Entry(logos).State=System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(logos);
        }


        public ActionResult Delete(int id)
        {
            db.Logos.Remove(db.Logos.Find(id));
            db.SaveChanges();
            return RedirectToAction("Index");   
        }
    }
}