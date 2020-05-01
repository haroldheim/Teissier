using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Teissier.Logic.Dtos;
using Teissier.Logic.Interfaces;

namespace Teissier.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ApartmentTenantController : Controller
    {
        private readonly IApartmentTenantRepository _apartmentTenantRepository;

        public ApartmentTenantController(IApartmentTenantRepository apartmentTenantRepository)
        {
            _apartmentTenantRepository = apartmentTenantRepository;
        }

        [HttpGet()]
        public IActionResult Get()
        {
            return new JsonResult(_apartmentTenantRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Add([FromBody] ApartmentTenantDto apartment)
        {
            if (apartment == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApartmentTenantDto apartmentAdded = _apartmentTenantRepository.Add(apartment);

            return Ok(apartmentAdded);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult Single(int id)
        {
            ApartmentTenantDto apartment = _apartmentTenantRepository.GetDto(id);

            if (apartment == null)
            {
                return NotFound();
            }

            return Ok(apartment);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Remove(int id)
        {
            ApartmentTenantDto apartment = _apartmentTenantRepository.GetDto(id);

            if (apartment == null)
            {
                return NotFound();
            }

            _apartmentTenantRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update(int id, [FromBody]ApartmentTenantDto apartment)
        {
            var apartmentToCheck = _apartmentTenantRepository.Get(id);

            if (apartmentToCheck == null)
            {
                return NotFound();
            }

            if (id != apartment.Id)
            {
                return BadRequest("Ids do not match");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApartmentTenantDto updatedapartment = _apartmentTenantRepository.Update(apartment);

            return Ok(updatedapartment);
        }
    }
}
