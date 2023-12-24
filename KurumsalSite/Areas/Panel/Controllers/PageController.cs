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
    public class PageController : BaseController
    {
        //Page ve PageCategory Bitti Sıra son kontoller ve login sayfası kurmakta

        EntityModelContext db = new EntityModelContext();
        // GET: Panel/Page
        public ActionResult Index()
        {
            var page = db.Pages.Include(p => p.PageCategory).ToList();
            return View(page);
        }


        public ActionResult Create()
        {
            ViewBag.PageCategoryID = new SelectList(db.PageCategory, "PageCategoryID", "PageCategoryname");
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create(Pages page, HttpPostedFileBase image)
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


                    page.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                    page.ThumbURL = "/Uploads/thumb/" + gd.ToString() + uzanti;
                }
                page.PageDate = DateTime.Now;
                db.Pages.Add(page);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ProductEmlakID = new SelectList(db.PageCategory, "PageCategoryID", "PageCategoryname", page.PageCategoryID);
            return View(page);
        }










        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Pages emlak = db.Pages.Find(id);
            ViewBag.PageCategoryID = new SelectList(db.PageCategory, "PageCategoryID", "PageCategoryname");
            if (id == null)
            {
                return HttpNotFound();
            }
            return View(emlak);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit(Pages page, HttpPostedFileBase image)
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


                    page.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                    page.ThumbURL = "/Uploads/thumb/" + gd.ToString() + uzanti;
                }
                page.PageDate = DateTime.Now;
                db.Entry(page).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ProductEmlakID = new SelectList(db.PageCategory, "PageCategoryID", "PageCategoryname", page.PageCategoryID);
            return View(page);
        }


        public ActionResult Delete(int id)
        {
            Pages page = db.Pages.Find(id);
            page.IsActive = false;
            db.Entry(page).State=EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");
        }



        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Pages page = db.Pages.Find(id);
            ViewBag.pages = db.PageCategory.FirstOrDefault(c => c.PageCategoryID == page.PageID);

            if (id == null)
            {
                return HttpNotFound();
            }
            return View(page);

        }
    }
}