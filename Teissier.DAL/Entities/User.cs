using System;
using System.Collections.Generic;

namespace Teissier.DAL.Entities
{
    public partial class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public byte[] Password { get; set; }
        public byte[] Salt { get; set; }
    }
}
