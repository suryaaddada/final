using Hexaware_project___WEBAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hexaware_project___WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly CTRMDBContext _context;
        public DeviceController (CTRMDBContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("GetDevice")]
        public List<Device>GetDevice()
        {
            if (!_context.Device.Any())
            {
                throw new System.Exception("No Elements Available");
            }
            List<Device> devices = _context.Device.ToList();
            List<Nurse> nurses = _context.Nurse.ToList();
            foreach (Device device in devices)
            {
                if (nurses.Any(nurse => nurse.DeviceId == device.Id && nurse.Status == "Free"))
                {
                    device.Status = "Free";
                    device.PatientId = null;
                    device.PatientEmail = null;
                }
                
            }


            return devices;
        }

        [HttpGet("GetDeviceById/{id}")]
        public IActionResult GetDeviceById(int id)
        {
            if (_context.Device.FirstOrDefault(d => d.Id == id) == null)
            {
                throw new System.Exception("No Elements Available");
            }
            var device = _context.Device.FirstOrDefault(d => d.Id == id);
            return Ok(device);
        }



        [HttpPost]
        public IActionResult Post([FromBody] Device device)
        {
            try
            {
                _context.Device.Add(device);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Error occurred while saving the device.");
            }
            return Created("device Added", device);
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Device device = _context.Device.Find(id);
                device.Isactive = false;
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Some Error Occured While Deleting");
            }
            return Ok();
        }
        [HttpPut("UpdateDevice/{id}")]
        public async Task<IActionResult> UpdateDevice(int id, string name, string patientEmail, string result, string status,int count)
        {
            try
            {
                var existingDevice = _context.Device.FirstOrDefault(p => p.Id == id);

                if (existingDevice == null)
                {
                    return NotFound();
                }

                existingDevice.Name = name;

                existingDevice.PatientEmail = patientEmail;

                var existingPatient = _context.Patient.FirstOrDefault(p => p.Email == patientEmail);

                if (existingPatient == null)
                {
                    
                    return BadRequest("Patient with provided email not found");
                }

                existingDevice.PatientId = existingPatient.Id;

                existingDevice.Patientinfo = result;
                existingDevice.Status = status;
                existingDevice.Count = count;

                if (status == "Assigned")
                {
                    var nursesUsingDevice = _context.Nurse
                        .Where(nurse => nurse.Status == "Free")
                        .ToList();

                    var existingAssignment = _context.Nurse
                        .Any(nurse => nurse.DeviceId == id && nurse.Status == "Assigned" && nurse.PatientId == existingPatient.Id);

                    if (!existingAssignment && nursesUsingDevice.Any())
                    {
                        var nurseToAssign = nursesUsingDevice.First();

                        nurseToAssign.PatientId = existingPatient.Id;
                        nurseToAssign.Status = "Assigned";
                        nurseToAssign.DeviceId = id;
              

                        _context.Entry(nurseToAssign).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    }
                }

                _context.Entry(existingDevice).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // Handle the exception appropriately
            }

            return NoContent();
        }
        [Authorize(Roles ="Nurse")]
        [HttpGet("GetPatId")]

        public IActionResult GetName(int id)
        {
            var user = _context.Device.FirstOrDefault(u => u.PatientId == id);
            var user1 = _context.Nurse.FirstOrDefault(u => u.PatientId == id);
            var user2 = user1.Status;
            if (user == null)
            {
                return Unauthorized();
            }
            if(user2 == "Free")
            {
                user.Status = "Free";
                user.PatientId = null;
            }

            return Ok(user);

        }
        [Authorize(Roles = "Patient")]
        [HttpGet("GetPatId1")]

        public IActionResult GetName1(int id)
        {
            var user = _context.Device.FirstOrDefault(u => u.PatientId == id);
            
            if (user == null)
            {
                return Unauthorized();
            }
          

            return Ok(user);

        }



    }
}
