using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace KurumsalEntityLayer.Entity
{
    public class Contact
    {
        //Şirketin iletişim bilgileri bu veri tabanından gösterilecek 
        //İletişim veri tabanı 
        [Key]
        public int ContactID { get; set; }


        [StringLength(150)]
        public string ContactTitle { get; set; }


        [StringLength(17)]
        public string Phone { get; set; }


        [StringLength(17)]
        public string Whatsapp { get; set; }


        [StringLength(120)]
        public string Email { get; set; }

        public string Adres { get; set; }


        [StringLength(500)]
        [AllowHtml]
        public string Map { get; set; }






    }
}
