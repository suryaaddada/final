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
    public class NurseControllerTests : IDisposable
    {
        private readonly NurseController _controller;
        private readonly CTRMDBContext _context;

        public NurseControllerTests()
        {
            
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<CTRMDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _context = new CTRMDBContext(options);

            
            SeedTestData();

            _controller = new NurseController(_context);
        }

        private void SeedTestData()
        {
            var nurses = new List<Nurse>
            {
                new Nurse
                {
                    Id = 1003,
                    Name = "Kayal",
                    Gender = "female",
                    Mobile = 9090909090,
                    Email = "kayal@gmail.com",
                    PatientId = 1004,
                    DeviceId = 10,
                    Result = "Yet to Declare",
                    Isactive = true,
                    Status = "Assigned"
                },
                new Nurse
                {
                    Id = 3011,
                    Name = "Kia",
                    Gender = "female",
                    Mobile = 7890987772,
                    Email = "kia@gmail.com",
                    PatientId = 4016,
                    DeviceId = 4029,
                    Result = "Yet to declare",
                    Isactive = true,
                    Status="Assigned"
                },
               
            };

            _context.Nurse.AddRange(nurses);
            _context.SaveChanges();
        }

        [Fact]
        public void GetNurse_WithData_ReturnsListOfNurses()
        {

            var result = _controller.GetNurse();

            
            Assert.NotNull(result);
            Assert.IsType<List<Nurse>>(result);
            Assert.NotEmpty(result);


            var nurseNames = result.Select(n => n.Name).ToList();
            Assert.Contains("Kayal", nurseNames);
            Assert.Contains("Kia", nurseNames);
        }

        [Fact]
        public void GetNurse_NoData_ThrowsException()
        {
           
            _context.Nurse.RemoveRange(_context.Nurse);
            _context.SaveChanges();

            var ex = Assert.Throws<System.Exception>(() => _controller.GetNurse());
            Assert.Equal("No Elements Available", ex.Message);
        }
        [Fact]
        public void Post_ValidNurse_ReturnsCreated()
        {
           
            var validNurse = new Nurse
            {
                Id = 1003,
                Name = "Kayal",
                Gender = "female",
                Mobile = 9090909090,
                Email = "kayal@gmail.com",
                PatientId = 1004,
                DeviceId = 10,
                Result = "Yet to Declare",
                Isactive = true
            };

            
            var result = _controller.Post(validNurse);

            
            Assert.NotNull(result);
            Assert.IsType<CreatedResult>(result);

            
            var createdResult = (CreatedResult)result;
            Assert.Equal("Nurse Added", createdResult.Value); 

            
            var nurseInDatabase = _context.Nurse.Find(validNurse.Id); 
            Assert.NotNull(nurseInDatabase);
            Assert.Equal(validNurse.Name, nurseInDatabase.Name);
            Assert.Equal(validNurse.Gender, nurseInDatabase.Gender);
            
        }

    

       






        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
