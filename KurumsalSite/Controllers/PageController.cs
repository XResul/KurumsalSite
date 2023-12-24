using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Controllers
{
    public class PageController : Controller
    {
        EntityModelContext db = new EntityModelContext();
        // GET: Page
        public ActionResult Index(int id)
        {
            return View();
        }

        public ActionResult PageDetail(int id)
        {
            Pages pagesFind = db.Pages.Find(id);
            return View(pagesFind);
        }

    }
}