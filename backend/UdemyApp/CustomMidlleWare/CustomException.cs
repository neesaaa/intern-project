using DomainLayer.Exceptions;
using Shared;

namespace UdemyApp.CustomMidlleWare
{
    public class CustomException
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<CustomException> _Logger;
        public CustomException(RequestDelegate next, ILogger<CustomException> logger) 
        {
            _next = next;
            _Logger = logger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "something went wrong");
                var res = ex switch
                {
                    NotFoundException => StatusCodes.Status404NotFound,
                    UnauthorizedException => StatusCodes.Status401Unauthorized,
                    BadRequestException badreq => StatusCodes.Status400BadRequest,
                    _ => StatusCodes.Status500InternalServerError,

                };
                context.Response.StatusCode= res;
                var response = new ErorToReturn
                {
                    StatusCode = res,
                    ErrorMessage = ex.Message

                };

                await context.Response.WriteAsJsonAsync(response);
            }

        } 
    }
}
