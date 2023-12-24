using KurumsalEntityLayer.Entity;
using KurumsalSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Controllers
{
    public class FooterController : Controller
    {
        EntityModelContext db = new EntityModelContext();
        // GET: Footer
        public ActionResult index()
        {
            FooterViewModel model = new FooterViewModel();
            model.Social = db.Socials.Take(1).FirstOrDefault();
            model.contact = db.Contacts.Take(1).FirstOrDefault();

            model.LastPage = db.Pages.Where(p => p.PageCategoryID == 1 && p.IsActive == true).ToList();


            model.OurProjectG = db.Projects.Where(p=>p.IsActive==true).Take(4).ToList();

            model.OurProduct = db.Products.Where(p => p.IsActive == true).ToList();



            model.projectCategories=db.ProjectCategory.Where(p=>p.IsActive==true).ToList();

            return PartialView("_footer", model);
        }




    }
}