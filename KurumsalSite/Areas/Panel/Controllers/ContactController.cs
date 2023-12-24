using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Areas.Panel.Controllers
{
    public class ContactController : BaseController
    {
        EntityModelContext db = new EntityModelContext();
        // GET: Panel/Contact
        public ActionResult Index()
        {
            return View(db.Contacts.ToList());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Contact contact)
        {
            if(ModelState.IsValid)
            {
                db.Contacts.Add(contact);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(contact);
        }


        [HttpGet]
        public ActionResult Edit(int? id)
        {
            if(id == null)
            {
                return HttpNotFound();
            }
            Contact contact = db.Contacts.Find(id);
            if(contact == null)
            {
                return HttpNotFound();
            }
            return View(contact);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Contact contact)
        {
            if(ModelState.IsValid)
            {
                db.Entry(contact).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(contact);
        }



        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Contact contact = db.Contacts.Find(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            return View(contact);
        }

        public ActionResult Delete(int id)
        {
            db.Contacts.Remove(db.Contacts.Find(id));
            db.SaveChanges();
            return RedirectToAction("Index");
        }


    }
}