using InteractiveSolutions.Models;
using InteractiveSolutions.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InteractiveSolutions.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var customer = await _customerService.Login(model);

            if (customer != null)
            {
                return Ok(customer);
            }
            else
            {
                return BadRequest(new { Message = "Invalid login attempt!" });
            }
        }
    }
}
