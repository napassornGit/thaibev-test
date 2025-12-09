using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllProduct()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

                return Ok("Hello from controller!!!");
        }
    }
}