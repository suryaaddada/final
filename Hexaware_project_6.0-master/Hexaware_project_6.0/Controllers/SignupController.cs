using Hexaware_project___WEBAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel;
using System.Xml.Linq;
using Microsoft.AspNetCore.Authentication.Google;
using Hexaware_project_6._0.Hubs;
using System.Globalization;

namespace Hexaware_project___WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly CTRMDBContext _context;
       

        private bool isAdmin = false;
        private bool isNurse = false;


        public SignupController(CTRMDBContext context)
        {
            _context = context;
           

        }







        [HttpPost("CheckAdmin")]
        public IActionResult CheckAdmin([FromBody] Signup credentials)
        {

            if (credentials.Email == "kamal@gmail.com" && credentials.Password == "kamal123#" || credentials.Email == "kamalsutte786@gmail.com" && credentials.Password == "kamal786#")
            {
                isAdmin = true;
            }



            return Ok(isAdmin);
        }



        [HttpGet("GetSignup")]
        public List<Signup> GetSignup()
        {
            if (_context.Signup.ToList() == null)
            {
                throw new System.Exception("No Login Detail Available");
            }
            List<Signup> signup = _context.Signup.ToList();

            if (signup.Count == 0)
            {
                throw new System.Exception("No Login Detail Available");
            }
            return signup;

        }


        [HttpPost]
        public IActionResult Post([FromBody] Signup signup)
        {

            try
            {
                var existingUser = _context.Signup.FirstOrDefault(u => u.Email == signup.Email);
                var NurseLogin = _context.Nurse.FirstOrDefault(u => u.Email == signup.Email);

                if (existingUser != null)
                {
                    return BadRequest("Email is already registered. Please login.");

                }
                _context.Signup.Add(signup);
                _context.SaveChanges();
                


                if(NurseLogin == null)
                {




                    Patient newPatient = new Patient
                    {

                        Password = signup.Password,
                        Firstname = signup.Name,
                        Lastname = "NA",
                        Gender = "NA",
                        Dob = DateTime.Today,
                        Address = "NA",
                        Mobile = signup.Mobile,
                        Date = DateTime.Today,
                        Email = signup.Email,
                        IsActive = signup.Isactive,


                    };

                    _context.Patient.Add(newPatient);
                    _context.SaveChanges();
                }
                else
                {
                   

                }








            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();

            }
            return Created("user Added", "user Added");



        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Signup signup = _context.Signup.Find(id);
                signup.Isactive = false;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }

            return Ok();
        }


        [HttpPost("CheckEmailExist")]
        public IActionResult CheckEmailExist(string email)
        {
            var user = _context.Signup.FirstOrDefault(u => u.Email == email);
            if (user != null)
            {
                return Ok(1);
            }
            else
            {
                return NotFound(0);
            }
        }

        [HttpGet("IsNurse")]
        public IActionResult IsNurse(string email)
        {
            var user = _context.Nurse.FirstOrDefault(u => u.Email == email);


                if (user != null)

            {
                isNurse = true;
                return Ok(isNurse);
            }
                else
            {
                return NotFound(0);
            }
        }
    }
}

       


