using Microsoft.AspNetCore.Mvc;
using thaibev_test_api.Services;
using thaibev_test_api.Models;

namespace thaibev_test_api.Controllers;

[Route("product")]
[ApiController]
[Produces("application/json")]
public class ProductController(IProductService service) : ControllerBase
{
    private readonly IProductService _service = service;

    [HttpGet("GetAllProduct")]
    public async Task<IActionResult> GetAllProduct()
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _service.GetAllProduct(); 
        return Ok(result);
    }

    [HttpPost("CreateProduct")]
    public async Task<IActionResult> CreateProduct([FromBody] Product data)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _service.CreateStudyPeriod(data); 
        return Ok(result);
    }

    [HttpPost("DeleteProduct")]
    public async Task<IActionResult> DeleteProduct([FromQuery] int productId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _service.DeleteProduct(productId); 
        return Ok(result);
    }
}
