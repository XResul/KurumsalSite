using KurumsalEntityLayer.Entity;
using KurumsalSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace KurumsalSite.Controllers
{
    public class HomeController : Controller
    {
        //PartialView navbar da kaldık oradan devam edecegiz 
        //yeni bi navbar bulacagız
        EntityModelContext db = new EntityModelContext();
        public ActionResult Index()
        {
            HomeViewModel model = new HomeViewModel();
            model.sliders = db.Sliders.ToList();
            model.PageHakkimizda = db.Pages.Where(p => p.PageID == 1 && p.IsActive == true).FirstOrDefault();
            model.productCategories=db.productCategory.ToList();    
            model.Logoss=db.Logos.ToList();

            model.products = db.Products.ToList();
            model.Projects=db.Projects.Where(p=>p.IsActive==true).ToList();    
            return View(model);
        }

        public ActionResult About()
        {
            HomeViewModel model=new HomeViewModel();    
            model.PageHakkimizda = db.Pages.Where(p => p.PageID == 1 && p.IsActive == true).FirstOrDefault();
            return PartialView("_About",model);
        }

        public ActionResult Contact()
        {


 

            ContactViewModel model = new ContactViewModel();    

            model.contact=db.Contacts.Take(1).ToList().FirstOrDefault();

            model.LogosList = db.Logos.ToList();


             return View(model);
        }



        public ActionResult iletisimForm(string email,string ad,string mesaj)
        {


            // Gönderenin e-posta adresi ve şifresi
            string senderEmail = "mail@gmail.com";
            string senderPassword = "211651";

            // Alıcı e-posta a

            // E-posta konusu
            string subject = "Merhdresi";
            string recipientEmail = "aaa@gmail.com";

            // E-posta içeriği
            string body = $"AdSoyad:{ad} <br>Email:{email} <br>Mesaj:{mesaj}";

            // SMTP sunucu ayarları
            SmtpClient smtpClient = new SmtpClient("smtp.example.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            // E-posta gönderme işlemi
            MailMessage mailMessage = new MailMessage(senderEmail, recipientEmail, subject, body);

            try
            {
                smtpClient.Send(mailMessage);
                TempData["formMesaj"] = "gönderildi";

            }
            catch (Exception ex)
            {
                TempData["formMesaj"] = "Bir hata oluştur";

            }

            return RedirectToAction("Contact");
           
        }


        //Hocam Footer kısmını ekledıgımde boyle oluyordu 
        public ActionResult navbar()
        {
            EntityModelContext dbmodel = new EntityModelContext();
            NavbarViewModel navmodel = new NavbarViewModel();
          List<Pages> lp = dbmodel.Pages.ToList();
            navmodel.pages = lp;

            navmodel.ProjectCategorys = db.ProjectCategory.ToList();
            navmodel.Projects = db.Projects.Where(p=>p.IsActive==true).ToList();

            navmodel.ProductCategorys = db.productCategory.ToList();
            navmodel.Products = db.Products.Where(p=>p.IsActive==true).ToList();

            navmodel.ContactTake1=db.Contacts.Take(1).ToList().FirstOrDefault();
            navmodel.SocialTake1=db.Socials.Take(1).ToList().FirstOrDefault();

            return PartialView("_navbar", navmodel);

        }


        public ActionResult swiper()
        {

            HomeViewModel viewmodel = new HomeViewModel();

            viewmodel.sliders = db.Sliders.ToList();

            return PartialView("_swiper", viewmodel);
        }



     
    }
}