using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Teissier.Logic.Dtos;
using Teissier.Logic.Interfaces;

namespace Teissier.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class RecordController : Controller
    {
        private readonly IRecordRepository _recordRepository;

        public RecordController(IRecordRepository recordRepository)
        {
            _recordRepository = recordRepository;
        }

        [Route("{apartmentTenantId:int}")]
        [HttpGet()]
        public IActionResult Get(int apartmentTenantId)
        {
            return new JsonResult(_recordRepository.Get(apartmentTenantId));
        }

        [Route("generate-receipts")]
        [HttpPost]
        public IActionResult GenerateReceipts([FromBody] ReceiptDto receipt)
        {
            if (receipt == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _recordRepository.GenerateReceipt(receipt);

            return Ok();
        }

        [HttpPost]
        public IActionResult Add([FromBody]RecordDto record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _recordRepository.Add(record);

            return Ok();
        }
    }
}
