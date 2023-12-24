using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Areas.Panel.Controllers
{
    public class HomeController : BaseController
    {
        
        // GET: Panel/Home
        public ActionResult Index()
        {
            return View();
        }
    }
}