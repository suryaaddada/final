
using Hexaware_project___WEBAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hexaware_project___WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NurseController : ControllerBase
    {

        private readonly CTRMDBContext _context;
        public NurseController(CTRMDBContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetNurse")]
        public List<Nurse> GetNurse()
        {
            if (!_context.Nurse.Any())
            {
                throw new System.Exception("No Elements Available");
            }

            List<Nurse> nurses = _context.Nurse.ToList();
            List<Device> devices = _context.Device.ToList();

            foreach (var nurse in nurses)

            {
                if (nurse.Status == "Free")
                {
                    Device device = devices.FirstOrDefault(d => d.Id == nurse.DeviceId);



                    nurse.PatientId = null;
                    nurse.DeviceId = null;
                    nurse.Result = null;
                    nurse.PatientName = null;
                    nurse.DeviceName = null;
                }

                if (nurse.Status == "Free")
                {
                    nurse.PatientName = null;
                    nurse.DeviceName = null;
                }
                else
                {
                    Patient patient = _context.Patient.FirstOrDefault(p => p.Id == nurse.PatientId);
                    nurse.PatientName = patient.Firstname;
                    Device device = _context.Device.FirstOrDefault(p => p.Id == nurse.DeviceId);
                    nurse.DeviceName = device.Name;
                }

            }



            return nurses;
        }


        [HttpPost]
        public IActionResult Post([FromBody] Nurse nurse)
        {
            try
            {
                _context.Nurse.Add(nurse);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Created("", "Nurse Added");
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Nurse nurse = _context.Nurse.Find(id);
                nurse.Isactive = false;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return Ok();
        }
        [HttpPut("UpdateNurse/{id}")]
        public async Task<IActionResult> UpdatePatient(int id, string name, long mobile, int patientId, int deviceId, string email, string result, string status)
        {
            try
            {
                var ent = await _context.Patient.FindAsync(id);
                var existingNurse = _context.Nurse.FirstOrDefault(p => p.Id == id);

                if (existingNurse == null)
                {
                    return NotFound();
                }
                existingNurse.Name = name;
                existingNurse.Mobile = mobile;

                existingNurse.PatientId = patientId;
                existingNurse.DeviceId = deviceId;

                existingNurse.Email = email;
                existingNurse.Result = result;
                existingNurse.Status = status;

                var patient = _context.Patient.FirstOrDefault(p => p.Id == patientId);
                var device = _context.Device.FirstOrDefault(d => d.Id == deviceId);

                if (patient != null)
                {
                    existingNurse.PatientId = patientId;
                    existingNurse.PatientName = patient.Firstname; // Assuming there's a property 'Name' in the Patient entity.
                }

                if (device != null)
                {
                    existingNurse.DeviceId = deviceId;
                    existingNurse.DeviceName = device.Name; // Assuming there's a property 'Name' in the Device entity.
                }


                _context.Entry(existingNurse).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return NoContent();
        }
        [Authorize(Roles = "Patient")]
        [HttpGet("GetPatId")]

        public IActionResult GetName(int id)
        {
            var user = _context.Nurse.FirstOrDefault(u => u.PatientId == id);
            if (user == null)
            {
                return Unauthorized();

            }
            if (user.PatientId == null && user.DeviceId == null)
            {
                user.PatientName = null;
                user.DeviceName = null;
            }
            else
            {
                Patient patient = _context.Patient.FirstOrDefault(p => p.Id == user.PatientId);
                user.PatientName = patient.Firstname;
                Device device1 = _context.Device.FirstOrDefault(p => p.Id == user.DeviceId);
                user.DeviceName = device1.Name;
            }


            return Ok(user);

        }
        [Authorize(Roles = "Nurse")]
        [HttpGet("GetPatientByEmail")]
        public IActionResult GetPatient(string email)
        {
            var user = _context.Nurse.FirstOrDefault(u => u.Email == email);
            var user1 = user.PatientId;
            var user2 = _context.Patient.FirstOrDefault(u => u.Id == user1);
            if (user2 == null || user.Status == "Free")
            {
                return Unauthorized();
            }

            return Ok(user2);
        }
        [Authorize(Roles = "Nurse")]
        [HttpGet("GetNurseByEmail")]
        public IActionResult GetNurse(string email)
        {
            var user = _context.Nurse.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return Unauthorized();
            }

            if (user.DeviceId != null)
            {
                int id = (int)user.DeviceId;
                var device = _context.Device.FirstOrDefault(d => user.DeviceId == id);

                if (device != null && user.Status == "Free")
                {
                    user.PatientId = null;
                    user.DeviceId = null;
                    device.PatientId = null;
                }


                if (user.Status == "Free")
                {
                    user.PatientName = null;
                    user.DeviceName = null;
                }
                else
                {
                    Patient patient = _context.Patient.FirstOrDefault(p => p.Id == user.PatientId);
                    user.PatientName = patient.Firstname;
                    Device device1 = _context.Device.FirstOrDefault(p => p.Id == user.DeviceId);
                    user.DeviceName = device1.Name;
                }
            }

            return Ok(user);
        }

        [HttpGet("NurseOrNot")]
        public IActionResult NurseOrNot(string email)
        {
            var user = _context.Nurse.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return Ok(false);
            }

            return Ok(true);
        }



        [HttpGet("GetFreeNurseName")]
        public ActionResult<List<string>> GetFreeNurseNames()
        {
            try
            {
                List<int> freeNurseNames = _context.Nurse
                    .Where(n => n.Status == "free")
                    .Select(n => n.Id)
                    .ToList();


                if (freeNurseNames.Any())
                {
                    return Ok(freeNurseNames);
                }
                else
                {
                    return NotFound("No free nurses found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }


        }
   }
}