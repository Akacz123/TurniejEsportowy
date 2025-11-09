using Microsoft.AspNetCore.Mvc;

namespace ETurniejeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                message = "API działa poprawnie!",
                timestamp = DateTime.UtcNow,
                status = "connected"
            });
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "healthy" });
        }
    }
}