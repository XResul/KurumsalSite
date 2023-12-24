using KurumsalEntityLayer.Entity;
using KurumsalSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Controllers
{
    public class ProjectTController : Controller
    {
        EntityModelContext db = new EntityModelContext();
        // GET: ProjectT
        public ActionResult Index()
        {
            Project_T_HomeView model = new Project_T_HomeView();
            model.projects = db.Projects.ToList();

            model.ProjectCategorys = db.ProjectCategory.Where(p => p.IsActive == true).FirstOrDefault();

            return View(model);
        }


        //Detail_Project
        //Proje Image olması lazım

        //GuncelP
        //YapilanP


        public ActionResult YapilanP(int id)
        {
            Project_T_HomeView model = new Project_T_HomeView();
            model.projects = db.Projects.Where(p => p.ProjectCategoryID == id && p.IsActive == true).ToList();
            model.ProjectCategorys = db.ProjectCategory.Where(p => p.ProjectCategoryID == id && p.IsActive == true).FirstOrDefault();

            return View(model);
        }


        public ActionResult GuncelP(int id)
        {
            Project_T_HomeView model = new Project_T_HomeView();

            model.projects = db.Projects.Where(p => p.ProjectCategoryID == id && p.IsActive == true).ToList();
            model.ProjectCategorys = db.ProjectCategory.Where(p => p.ProjectCategoryID == id && p.IsActive == true).FirstOrDefault();

            return View(model);

        }




        public ActionResult Project_Detail(int id)
        {

            Project projectY = db.Projects.Find(id);


            return View(projectY);
        }


        public ActionResult ProjectImageDetail(int id)
        {


            Project_T_HomeView model = new Project_T_HomeView();
            model.ProjectImagess = db.ProjectImages.Where(p => p.ProjectID == id).ToList();

            model.ProjectSecilen = db.Projects.Where(p => p.ProjectID == id).Take(1).FirstOrDefault();

            return View(model);


        }






    }
}