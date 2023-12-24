using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class ProjectImage
    {

        [Key]
        public int ProjectImageID { get; set; }

        [StringLength(255)]
        public string ProjectImageUrl { get; set; }

        [StringLength(255)]
        public string ProjectThumbURL { get; set; }


        //Kalıtım yaptık project veri tabanı projectımage veri tabanının anası'dır
        public int ProjectID { get; set; }
        public Project Project { get; set; }



    }

}
