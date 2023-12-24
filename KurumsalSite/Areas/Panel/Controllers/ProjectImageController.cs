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
    public class ProjectImageController : BaseController
    {
        EntityModelContext db = new EntityModelContext();
        // GET: Panel/ProjectImage
        public ActionResult Index(int id)
        {
            var resimYakalama = db.ProjectImages.Where(i => i.ProjectID == id).ToList();
            return View(resimYakalama);
        }





        [HttpPost]
        public ActionResult AddImage(ProjectImage imageProject, HttpPostedFileBase image)
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


                imageProject.ProjectImageUrl = "/Uploads/image/" + gd.ToString() + uzanti;

                imageProject.ProjectThumbURL = "/Uploads/thumb/" + gd.ToString() + uzanti;
            }
            db.ProjectImages.Add(imageProject);
            db.SaveChanges();
            return RedirectToAction("index", "ProjectImage", new { id = imageProject.ProjectID });
        }


        public ActionResult Delete(int id)
        {
            var yakalama = db.ProjectImages.Find(id);

            db.ProjectImages.Remove(yakalama);
            db.SaveChanges();
            return RedirectToAction("index", "ProjectImage", new { id = yakalama.ProjectID });

        }
    }
}