using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Teissier.Logic.Dtos
{
    public class ApartmentTenantDto
    {
        public ApartmentTenantDto() {
            Record = new List<RecordDto>();
        }

        public int Id { get; set; }
        [Required]
        public int TenantId { get; set; }
        [Required]
        public int ApartmentId { get; set; }
        [Required]
        public DateTime DateIn { get; set; }
        public DateTime? DateOut { get; set; }
        [Required]
        public string PaymentMethod { get; set; }
        [Required]
        public decimal Rent { get; set; }
        public decimal Balance { get; set; }
        public virtual List<RecordDto> Record { get; set; }

        public ApartmentDto Apartment { get; set; }
        public TenantDto Tenant { get; set; }
    }
}
