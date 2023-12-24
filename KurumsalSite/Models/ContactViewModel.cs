using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KurumsalSite.Models
{

    public class ContactViewModel
    {

        public Contact contact { get; set; }

        //iletişim sayfasında loglarda bulunacak footer'ın bi üstünde
        public List<Logos> LogosList { get; set; }
    }
}