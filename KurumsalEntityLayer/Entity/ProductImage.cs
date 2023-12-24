using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class ProductImage
    {
        [Key]
        public int ProductImageID { get; set; }

        [StringLength(255)]
        public string ProductImageURL { get; set; }


        [StringLength(255)]
        public string ProductImageThumbURL { get; set; }


        //Kalıtım yaptık productImage 'in anası product'dır
        //Sayfamıza eklediğimiz ürünlerin galerisi veya resimleri olucak
        public int ProductID { get; set; }
        public Product Product { get; set; }
    }
}
