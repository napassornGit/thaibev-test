using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("PersonInfo")]
[ApiController]
[Produces("application/json")]
public class PersonInfoController(IPersonInfoService personInfoService) : ControllerBase
{
    private readonly IPersonInfoService service = personInfoService;

    [HttpGet("GetAllPersonInfo")]
    public async Task<IActionResult> GetAllPersonInfo()
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await service.GetAllPersonInfo();
        return Ok(result);
    }

    [HttpPost("CreatePersonInfo")]
    public async Task<IActionResult> CreatePersonInfo([FromBody] PersonInfo data)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await service.CreatePersonInfo(data);
        return Ok(result);
    }
}
