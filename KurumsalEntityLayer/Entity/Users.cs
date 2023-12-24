using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KurumsalEntityLayer.Entity
{
    public class Users
    {
        //Admin Panel'e giriş yapılırken kullanılması gerekenler
        //Rolleme olucak

        [Key]
        public int UserID { get; set; }

        [StringLength(50)]
        public string UserName { get; set; }

        [StringLength(50)]
        public string UserPassword { get; set; }

        [StringLength(80)]
        public string Email { get; set; }

        [StringLength (1)]
        public string Roles { get; set; }
    }
}
