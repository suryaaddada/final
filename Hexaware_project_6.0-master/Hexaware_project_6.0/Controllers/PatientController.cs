using Hexaware_project___WEBAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Hexaware_project___WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly CTRMDBContext _context;
        public PatientController(CTRMDBContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("GetPatient")]
        public List<Patient> GetPatient()
        {
            if (_context.Patient.ToList() == null)
            {
                throw new System.Exception("No Elements Available");
            }
            List<Patient> patients = _context.Patient.ToList();
            return patients;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Patient patient)
        {
            try
            {
                _context.Patient.Add(patient);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
                return Created("Patient Added", "Patient Added");
            
            
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Patient patient = _context.Patient.Find(id);
                patient.IsActive = false;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                
            }
            return Ok();
        }

        [HttpPut("UpdatePatient/{id}")]
        public async Task<IActionResult> UpdatePatient(int id, string Firstname,DateTime dob, long mobile,DateTime date, string email)
        {
            try
            {
                var ent = await _context.Patient.FindAsync(id);
                var existingPatient = _context.Patient.FirstOrDefault(p => p.Id == id);

                if (existingPatient == null)
                {
                    return NotFound();
                }
                existingPatient.Firstname = Firstname;
                existingPatient.Dob = dob;
               
                existingPatient.Mobile = mobile;
                existingPatient.Date = date;
               
                existingPatient.Email = email;
                _context.Entry(existingPatient).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return NoContent();

        }
        [Authorize(Roles ="Patient")]
        [HttpGet("GetData")]

        public IActionResult GetName(string email)
        {
            var user = _context.Patient.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);

        }
        [HttpGet("GetNameById")]

        public IActionResult GetNameById(int id)
        {
            var user = _context.Patient.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user.Firstname);

        }

        [HttpGet("GetId")]

        public IActionResult GetId(string email)
        {
            var user = _context.Patient.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user.Id);

        }
        [HttpGet("GetAllPatientEmail")]
        public List<string> GetPatientEmail()
        {
            List<string> emails = _context.Patient
                                          .Where(p => !string.IsNullOrEmpty(p.Email))
                                          .Select(p => p.Email)
                                          .ToList();

            if (emails == null || emails.Count == 0)
            {
                throw new System.Exception("No Emails Available");
            }

            return emails;
        }


    }
}
