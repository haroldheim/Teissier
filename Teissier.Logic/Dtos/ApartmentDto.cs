
using System.ComponentModel.DataAnnotations;

namespace Teissier.Logic.Dtos
{
    public class ApartmentDto
    {
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Level { get; set; }
        public bool CanBeRemoved { get; set; }

    }
}
