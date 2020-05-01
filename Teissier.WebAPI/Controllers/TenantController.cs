using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Teissier.Logic.Dtos;
using Teissier.Logic.Interfaces;

namespace Teissier.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TenantController : Controller
    {
        private readonly ITenantRepository _tenantRepository;

        public TenantController(ITenantRepository tenantRepository)
        {
            _tenantRepository = tenantRepository;
        }

        [HttpGet()]
        public IActionResult Get()
        {
            return new JsonResult(_tenantRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Add([FromBody] TenantDto tenant)
        {
            if (tenant == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TenantDto tenantAdded = _tenantRepository.Add(tenant);

            return Ok(tenantAdded);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult Single(int id)
        {
            TenantDto tenant = _tenantRepository.GetDto(id);

            if (tenant == null)
            {
                return NotFound();
            }

            return Ok(tenant);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Remove(int id)
        {
            TenantDto tenant = _tenantRepository.GetDto(id);

            if (tenant == null)
            {
                return NotFound();
            }

            _tenantRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update(int id, [FromBody]TenantDto tenant)
        {
            var tenantToCheck = _tenantRepository.Get(id);

            if (tenantToCheck == null)
            {
                return NotFound();
            }

            if (id != tenant.Id)
            {
                return BadRequest("Ids do not match");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TenantDto updatedTenant = _tenantRepository.Update(tenant);

            return Ok(updatedTenant);
        }
    }
}
