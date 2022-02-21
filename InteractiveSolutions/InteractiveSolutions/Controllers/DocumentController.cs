using InteractiveSolutions.Models;
using InteractiveSolutions.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
        public async Task<ActionResult> Post([FromBody] UploadDocumentModel model)
        {
            foreach (var document in model.Documents)
            {
                if (document.FileAsBase64.Contains(","))
                {
                    document.FileAsBase64 = document.FileAsBase64.Substring(document.FileAsBase64.IndexOf(",") + 1);
                }

                //theFile.FileAsByteArray = Convert.FromBase64String(theFile.FileAsBase64);
                document.File = Convert.FromBase64String(document.FileAsBase64);
            }

            int result = await _documentService.Upload(model.Documents);

            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            int result = await _documentService.Delete(id);

            return Ok(result);
        }

        [HttpGet]
        [Route("Download/{id}")]
        public async Task<IActionResult> Download(int id)
        {
            var document = await _documentService.GetById(id);

            var contentType = "application/pdf";
            var fileContentResult = new FileContentResult(document.File, contentType)
            {
                FileDownloadName = document.FileName
            };
            return fileContentResult;
        }
    }
}
