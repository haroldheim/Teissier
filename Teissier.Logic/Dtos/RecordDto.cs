using System;
using System.Collections.Generic;
using System.Text;

namespace Teissier.Logic.Dtos
{
    public class RecordDto
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public decimal Amount{ get; set; }
        public DateTime Date { get; set; }
        public int Type { get; set; }
        public decimal Total { get; set; }
        public int ApartementTenantId { get; set; }

        public ApartmentTenantDto ApartmentTenant { get; set; }
    }
}
