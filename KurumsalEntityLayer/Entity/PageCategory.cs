using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class PageCategory
    {

        public PageCategory()
        {
            Pages = new List<Pages>();    
        }

        [Key]
        public int PageCategoryID { get; set; }


        [StringLength(255)]
        [Required]
        public string PageCategoryname { get; set; }


        [StringLength(255)]
        public string ImageURL { get; set; }


        [StringLength(255)]
        public string MetaDescription { get; set; }


        [StringLength(255)]
        public string MetaKey { get; set; }


        public bool IsActive { get; set; }


        public ICollection<Pages> Pages { get; set; }
    }
}
