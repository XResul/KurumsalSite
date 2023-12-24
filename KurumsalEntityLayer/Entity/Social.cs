using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class Social
    {
        //Sosyal medya linklerimizi sosyal medya iconlarına verebilecegimiz sosyal medya veri tabanı
        //Footer ve navbar kısmında kullanacagız

        [Key]
        public int SocialID { get; set; }


        [StringLength(255)]
        public string Youtube { get; set; }



        [StringLength(255)]
        public string Instagram { get; set; }


        [StringLength(255)]
        public string Linkedin { get; set; }



        [StringLength(255)]
        public string Facebook { get; set; }


        [StringLength(255)]
        public string Twitter { get; set; }

    }
}
