using InteractiveSolutions.Models;
using InteractiveSolutions.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveSolutions.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class DocumentController : ControllerBase
    {
        private IDocumentService _documentService;

        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpGet]
        [Route("GetAllByCustomer/{id}")]
        public async Task<ActionResult<List<Document>>> GetAllByCustomer(int id)
        {
            var documents = await _documentService.GetAllByCustomer(id);

            return Ok(documents);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] List<Document> documents)
        {
            int result = await _documentService.Upload(documents);

            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            int result = await _documentService.Delete(id);

            return Ok(result);
        }
    }
}
