using System;
using System.Collections.Generic;

namespace Teissier.DAL.Entities
{
    public partial class Apartment
    {
        public Apartment()
        {
            ApartmentTenant = new HashSet<ApartmentTenant>();
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public string Level { get; set; }

        public virtual ICollection<ApartmentTenant> ApartmentTenant { get; set; }
    }
}
