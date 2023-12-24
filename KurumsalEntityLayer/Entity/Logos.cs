using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class Logos
    {

        //Yapıcagımız firmanın anlaşmalı oldugu şirketlerin adı ve logosu

        [Key]
        public int LogoID { get; set; }

        [StringLength(200)]
        public string LogoName { get; set; }

        [StringLength(255)]
        public string ImageURL { get; set; }



    }
}
