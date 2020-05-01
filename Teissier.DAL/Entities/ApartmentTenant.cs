using System;
using System.Collections.Generic;

namespace Teissier.DAL.Entities
{
    public partial class ApartmentTenant
    {
        public ApartmentTenant()
        {
            Record = new HashSet<Record>();
        }

        public int Id { get; set; }
        public int TenantId { get; set; }
        public int ApartmentId { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime? DateOut { get; set; }
        public string PaymentMethod { get; set; }
        public decimal Rent { get; set; }

        public virtual Apartment Apartment { get; set; }
        public virtual Tenant Tenant { get; set; }
        public virtual ICollection<Record> Record { get; set; }
    }
}
