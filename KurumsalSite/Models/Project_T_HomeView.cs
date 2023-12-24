using KurumsalEntityLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KurumsalSite.Models
{
    public class Project_T_HomeView
    {
        public List<Project> projects { get; set; }

        public ProjectCategory ProjectCategorys { get; set; }


        public List<ProjectImage> ProjectImagess { get; set; }


        public Project ProjectSecilen { get; set; }
    }
}