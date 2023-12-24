using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class Pages
    {

        [Key]
        public int PageID { get; set; }

        [StringLength(255)]
        public string PageTitle { get; set; }

        [StringLength(255)]
        public string ImageURL { get; set; }

        [StringLength(255)]
        public string ThumbURL { get; set; }


        [StringLength(255)]
        public string MetaDescription { get; set; }


        [StringLength(255)]
        public string MetaKey { get; set; }

        public string Description { get; set; }


        public DateTime PageDate { get; set; }

        public bool IsActive { get; set; }


        //Page Veri Tabanının anası PageCategory
        //Kalıtım Yaptık
        public int PageCategoryID { get; set; }
        public PageCategory PageCategory { get; set; }
    }
}
