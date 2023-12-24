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
    public class ProjectController : BaseController
    {
        //İnternet'ten dolayı devam edemedik projeye Kaldıgımız ye Edit Action 'unun kontrol etmekti
        //ProjectImage 'i oluşturacagız proje resimleri için 

        // Project controller'ın Create action ve view 'ini bitirdik 
        //Deatil views'de hangi category'e ait oldugunu yazdırmakta bi hata var


        EntityModelContext db = new EntityModelContext();
        // GET: Panel/Project
        public ActionResult Index()
        {
            var project = db.Projects.Include(p => p.ProjectCategory);
            return View(project.ToList());
        }

        public ActionResult Create()
        {

            ViewBag.ProjectCategoryID = new SelectList(db.ProjectCategory, "ProjectCategoryID", "ProjectCategoryName");

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create(Project project, HttpPostedFileBase image)
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


                    project.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.Projects.Add(project);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ProjectCategoryID = new SelectList(db.ProjectCategory, "ProjectCategoryID", "ProjectCategoryName", project.ProjectCategoryID);

            return View(project);
        }


        public ActionResult Edit(int? id)
        {

            if (id == null)
            {
                return HttpNotFound();
            }
            Project project = db.Projects.Find(id);
            ViewBag.ProjectCategoryID = new SelectList(db.ProjectCategory, "ProjectCategoryID", "ProjectCategoryName");
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit(Project project, HttpPostedFileBase image)
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


                    project.ImageURL = "/Uploads/image/" + gd.ToString() + uzanti;
                }
                db.Entry(project).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ProjectCategoryID = new SelectList(db.ProjectCategory, "ProjectCategoryID", "ProjectCategoryName", project.ProjectCategoryID);

            return View(project);

        }



        public ActionResult Detail(int? id)
        {

            if (id == null)
            {
                return HttpNotFound();
            }
            Project project = db.Projects.Find(id);
            ViewBag.projects = db.Projects.FirstOrDefault(p => p.ProjectCategoryID == project.ProjectID);
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }

        public ActionResult Delete(int id)
        {
            Project project = db.Projects.Find(id);
            project.IsActive = false;

            db.Entry(project).State = EntityState.Modified;


            db.SaveChanges();
            return RedirectToAction("Index");
        }


    }
}