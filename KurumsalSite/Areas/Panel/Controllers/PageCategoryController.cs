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
    public class PageCategoryController : BaseController
    {
        EntityModelContext db = new EntityModelContext();
        // GET: Panel/PageCategory
        public ActionResult Index()
        {
            return View(db.PageCategory.ToList());
        }


        public ActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(PageCategory category, HttpPostedFileBase image)
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

                    category.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.PageCategory.Add(category);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(category);
        }



        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            PageCategory category = db.PageCategory.Find(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            return View(category);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(PageCategory category, HttpPostedFileBase image)
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

                    category.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.Entry(category).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(category);
        }



        public ActionResult Delete(int id)
        {
            PageCategory category = db.PageCategory.Find(id);
            category.IsActive = false;
            db.Entry(category).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");
        }




        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            PageCategory category = db.PageCategory.Find(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            return View(category);
        }
    }
}