using Hexaware_project___WEBAPI.Controllers;
using Hexaware_project___WEBAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using Xunit;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TestProject1.Controller
{
    public class PatientControllerTests : IDisposable
    {
        private readonly PatientController _controller;
        private readonly CTRMDBContext _context;

        public PatientControllerTests()
        {
            
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<CTRMDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _context = new CTRMDBContext(options);

            _controller = new PatientController(_context);
        }



        [Fact]
        public void GetPatient_WithData_ReturnsPatients()
        {
          
            var patients = new List<Patient>
            {
                new Patient
                {
                    Id = 1,
                    Password="Kamal@12345",
                    Firstname = "kamal",
                    Lastname = "sutte",
                    Gender = "male",
                    Dob = new DateTime(2002-07-09),
                    Address = "parshivni",
                    Mobile = 7620317944,
                    Date = new DateTime(2023-09-09),
                    Email="kamalsutte786@gmail.com",
                    IsActive = true


                },
               
            };

            _context.Patient.AddRange(patients);
            _context.SaveChanges();

            
            var result = _controller.GetPatient();

            
            Assert.NotNull(result);
            Assert.IsType<List<Patient>>(result);

            
            var returnedPatients = (List<Patient>)result;
            Assert.Equal(patients.Count, returnedPatients.Count);
            foreach (var expectedPatient in patients)
            {
                var actualPatient = returnedPatients.FirstOrDefault(p => p.Id == expectedPatient.Id);
                Assert.NotNull(actualPatient);
                Assert.Equal(expectedPatient.Firstname, actualPatient.Firstname);
                Assert.Equal(expectedPatient.Lastname, actualPatient.Lastname);
            }
        }

        [Fact]
        public void Post_ValidPatient_ReturnsCreated()
        {
            
            var validPatient = new Patient
            {
                Id = 1,
                Password = "Kamal@12345",
                Firstname = "kamal",
                Lastname = "sutte",
                Gender = "male",
                Dob = new DateTime(2002 - 07 - 09),
                Address = "parshivni",
                Mobile = 7620317944,
                Date = new DateTime(2023 - 09 - 09),
                Email = "kamalsutte786@gmail.com",
                IsActive = true
            };

            
            var result = _controller.Post(validPatient);

            
            Assert.NotNull(result);
            Assert.IsType<CreatedResult>(result);

           
            var createdResult = (CreatedResult)result;
            Assert.Equal("Patient Added", createdResult.Value); 
        }

        [Fact]
        public void Delete_ExistingPatient_SetsIsactiveToFalse()
        {
           
            var existingPatient = new Patient
            {
                Id = 1,
                Password = "Kamal@12345",
                Firstname = "kamal",
                Lastname = "sutte",
                Gender = "male",
                Dob = new DateTime(2002 - 07 - 09),
                Address = "parshivni",
                Mobile = 7620317944,
                Date = new DateTime(2023 - 09 - 09),
                Email = "kamalsutte786@gmail.com",
                IsActive = true
            };

            _context.Patient.Add(existingPatient);
            _context.SaveChanges();

           
            _context.Entry(existingPatient).State = EntityState.Detached;

            
            var result = _controller.Delete(existingPatient.Id);

            
            _context.Entry(existingPatient).State = EntityState.Detached;

            
            Assert.NotNull(result);
            Assert.IsType<OkResult>(result);

           
            var deletedPatient = _context.Patient.Find(existingPatient.Id);
            Assert.NotNull(deletedPatient);
            Assert.False(deletedPatient.IsActive);
        }

      
         
            


        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
