using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class Slider
    {
        //Ana Sayfadaki Resimler ve açıklamalarda bu veri tabanını kullanacağız

        [Key]
        public int SliderID { get; set; }

        [StringLength(120)]
        public string SliderTitle { get; set; }


        [StringLength(255)]
        public string MetaDescription { get; set; }


        [StringLength(255)]
        public string ImageURL { get; set; }

    }
}
