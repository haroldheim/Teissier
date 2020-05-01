using System;
using System.Collections.Generic;

namespace Teissier.DAL.Entities
{
    public partial class Tenant
    {
        public Tenant()
        {
            ApartmentTenant = new HashSet<ApartmentTenant>();
        }

        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public virtual ICollection<ApartmentTenant> ApartmentTenant { get; set; }
    }
}
