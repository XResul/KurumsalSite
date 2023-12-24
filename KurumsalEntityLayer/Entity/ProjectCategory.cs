using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class ProjectCategory
    {
        public ProjectCategory()
        {
            Projects=new List<Project>();
        }

        [Key]
        public int ProjectCategoryID { get; set; }


        [StringLength(200)]
        public string ProjectCategoryName { get; set; }

        [StringLength(255)]
        public string ImageURL { get; set; }

        [StringLength (255)]
        public string MetaDescription { get; set; }

        [StringLength(255)]
        public string MetaKey { get; set; }


        public bool IsActive { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}
