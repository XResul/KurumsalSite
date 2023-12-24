using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class Project
    {

        public Project()
        {
            ProjectImages = new List<ProjectImage>();
        }
        [Key]
        public int ProjectID { get; set; }

        [StringLength(200)]
        public string ProjectName { get; set; }

        [StringLength(255)]
        public string ImageURL { get; set; }


        [StringLength(255)]
        public string ThumbURL { get; set; }

        [StringLength(255)]
        public string MetaDecription { get; set; }

        [StringLength(255)]
        public string MetaKey { get; set; }


        public string Description { get; set; }

        public bool IsActive { get; set; }

        //Kalıtım Yaptık

        public int ProjectCategoryID { get; set; }
        public ProjectCategory ProjectCategory { get; set; }

        //xxxxxxxxxxxxxxxxxxxxxxx
        public ICollection<ProjectImage> ProjectImages { get; set; }
    }
}
//[Key]
//public int ProductID { get; set; }

//[StringLength(200)]
//public string ProductName { get; set; }


//[StringLength(255)]
//public string ImageURL { get; set; }

//[StringLength(255)]
//public string ThumbURL { get; set; }


//[StringLength(255)]
//public string MetaDescription { get; set; }

//[StringLength(255)]
//public string MetaKey { get; set; }

//public string Description { get; set; }


//public DateTime ProductDate { get; set; }

//public bool IsActive { get; set; }
