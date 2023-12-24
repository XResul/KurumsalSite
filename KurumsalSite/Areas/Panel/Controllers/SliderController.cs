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
    public class SliderController : BaseController
    {
        EntityModelContext db = new EntityModelContext();
        // GET: Panel/Slider
        public ActionResult Index()
        {
            return View(db.Sliders.ToList());
        }


        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Slider slider, HttpPostedFileBase image)
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

                    slider.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.Sliders.Add(slider);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(slider);
        }

        [HttpGet]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Slider slider = db.Sliders.Find(id);
            if (slider == null)
            {
                return HttpNotFound();
            }
            return View(slider);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Slider slider, HttpPostedFileBase image)
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

                    slider.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.Entry(slider).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(slider);
        }


        [HttpGet]
        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Slider slider = db.Sliders.Find(id);
            if (slider == null)
            {
                return HttpNotFound();
            }
            return View(slider);
        }


        public ActionResult Delete(int id)
        {
            db.Sliders.Remove(db.Sliders.Find(id));
            db.SaveChanges();
            return RedirectToAction("Index");   
        }
    }
}