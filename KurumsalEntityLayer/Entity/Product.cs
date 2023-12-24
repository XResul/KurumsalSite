using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class Product
    {
        public Product()
        {
            ProductImages = new List<ProductImage>();
        }



        [Key]
        public int ProductID { get; set; }

        [StringLength(200)]
        public string ProductName { get; set; }


        [StringLength(255)]
        public string ImageURL { get; set; }

        [StringLength(255)]
        public string ThumbURL { get; set; }


        [StringLength(255)]
        public string MetaDescription { get; set; }

        [StringLength(255)]
        public string MetaKey { get; set; }

        public string Description { get; set; }


        public DateTime ProductDate { get; set; }

        public bool IsActive { get; set; }


        //Product veri tabanı anası productCategory
        //Kalıtım Yapcık productCategory veri tabanından product veri tabanı productcategory veri tabanına bağlı


        public int ProductCategoryID { get; set; }
        public ProductCategory ProductCategory { get; set; }

        //xxxxxxxxxxxxxxxxx
        public ICollection<ProductImage> ProductImages { get; set; }

    }
}
