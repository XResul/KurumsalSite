using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class EntityModelContext:DbContext
    {
        public EntityModelContext():base("name=sqlcon")
        {
        }


        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Logos> Logos { get; set; }
        public DbSet<Pages> Pages { get; set; }
        public DbSet<PageCategory> PageCategory { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> productCategory { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectCategory> ProjectCategory { get; set; }
        public DbSet<ProjectImage> ProjectImages { get; set; }
        public DbSet<Slider> Sliders { get; set; }
        public DbSet<Social> Socials { get; set; }
        public DbSet<Users> Users { get; set; }


    }
}
