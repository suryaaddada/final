using Hexaware_project___WEBAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Hexaware_project___WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly CTRMDBContext _context;
        IConfiguration configuration;

        public LoginController(CTRMDBContext context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }
        [HttpGet("IsNurse")]
        public bool IsNurse(string email)
        {
            try
            {
                var nurse = _context.Nurse.FirstOrDefault(x => x.Email == email);
                if (nurse == null)
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return true;
        }
        [HttpGet("IsPatient")]
        public bool IsPatient(string email)
        {
            var patient = _context.Patient.FirstOrDefault(x => x.Email == email);
            if(patient == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }


        [HttpPost]

        public IActionResult Post(string email, string password)
        {

            var user = _context.Signup.FirstOrDefault(u => u.Email == email && u.Password == password);
            if (user == null)
            {
                return Unauthorized();
            }

            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                                    new SymmetricSecurityKey(key),
                                    SecurityAlgorithms.HmacSha512Signature
                                );
            var claims = new List<Claim>
{
      new Claim(JwtRegisteredClaimNames.Email, email),
};
            string userRole = null;


            if (email == "surya@gmail.com" || email == "addadasurya@gmail.com")
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                userRole = "Admin";
            }
            if(IsNurse(email))
                {
                claims.Add(new Claim(ClaimTypes.Role, "Nurse"));
                userRole = "Nurse";

            }
            if (IsPatient(email))
            {
                claims.Add(new Claim(ClaimTypes.Role, "Patient"));
                userRole = "Patient";

            }




            var expires = DateTime.UtcNow.AddMinutes(10);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            return Ok(new { Token = jwtToken, Role = userRole});



        }
       
        [HttpPost("GetDetails")]
        public IActionResult Post(string email)
        {
            var user = _context.Signup.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return Ok("Not Authorized");
            }

            return Ok("Authorized");
        }

        [HttpPost("GetName")]

        public IActionResult GetName(string email, string password)
        {
            var user = _context.Signup.FirstOrDefault(u => u.Email == email && u.Password == password);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user.Name);

        }

    }
}
