using Microsoft.AspNetCore.Mvc;
using thaibev_test_api.Services;

namespace thaibev_test_api.Controllers;

[Route("product")]
[ApiController]
[Produces("application/json")]
public class ProductController(IProductService service) : ControllerBase
{
    private readonly IProductService _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAllProduct()
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _service.GetAllProduct(); 
        return Ok(result);
    }
}
