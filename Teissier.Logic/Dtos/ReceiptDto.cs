using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Teissier.Logic.Dtos
{
    public class ReceiptDto
    {
        [Required]
        public DateTime Date { get; set; }
    }
}
