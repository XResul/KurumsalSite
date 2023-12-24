using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class ProductCategory
    {
       //Yapılan Şirketin sundugu hizmetlerin bulundugu kategoriler
       //Örnek Mimarlık ;
       //Çocuk odası Yapımı
       //Restorant İç Desing'ı
       //Holding İç Mekan  Düzenlemesi 
       //vb şeyler bu veri tabanında olucak  productCategory'de olucak 
        
        public ProductCategory()
        {
            Products = new List<Product>();
        }


        [Key]
        public int ProductCategoryID { get; set; }


        [StringLength(255)]
        public string ProductCategoryName { get; set; }


        [StringLength(255)]
        public string ImageURL { get; set; }

    
        [StringLength(255)]
        public string MetaDescription { get; set; }


        [StringLength(255)]
        public string MetaKey { get; set; }

        public bool IsActive { get; set; }


        public ICollection<Product> Products { get; set; }
    }
}
