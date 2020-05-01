using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Teissier.Logic.Dtos;
using Teissier.Logic.Interfaces;

namespace Teissier.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ApartmentController : Controller
    {
        private readonly IApartmentRepository _apartmentRepository;

        public ApartmentController(IApartmentRepository apartmentRepository)
        {
            _apartmentRepository = apartmentRepository;
        }

        [HttpGet()]
        public IActionResult Get()
        {
            return new JsonResult(_apartmentRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Add([FromBody] ApartmentDto apartment)
        {
            if (apartment == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApartmentDto apartmentAdded = _apartmentRepository.Add(apartment);

            return Ok(apartmentAdded);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult Single(int id)
        {
            ApartmentDto apartment = _apartmentRepository.GetDto(id);

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
            ApartmentDto apartment = _apartmentRepository.GetDto(id);

            if (apartment == null)
            {
                return NotFound();
            }

            _apartmentRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update(int id, [FromBody]ApartmentDto apartment)
        {
            var apartmentToCheck = _apartmentRepository.Get(id);

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

            ApartmentDto updatedapartment = _apartmentRepository.Update(apartment);

            return Ok(updatedapartment);
        }
    }
}
