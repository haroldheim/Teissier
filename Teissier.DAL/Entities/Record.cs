using System;
using System.Collections.Generic;

namespace Teissier.DAL.Entities
{
    public partial class Record
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int Type { get; set; }
        public int? ApartementTenantId { get; set; }

        public virtual ApartmentTenant ApartementTenant { get; set; }
    }
}
