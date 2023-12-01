using System;
using Xunit;
using FluentAssertions;
using AutoFixture;
using Moq;
using Hexaware_project___WEBAPI.Controllers;
using Hexaware_project___WEBAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace TestProject1.Controller
{
    public class DeviceControllerTests : IDisposable
    {
        private readonly DeviceController _controller;
        private readonly CTRMDBContext _context;

        public DeviceControllerTests()
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

            _controller = new DeviceController(_context);
        }

        private void SeedTestData()
        {
            var devices = new List<Device>
            {
                new Device {
                    Id = 10,
                    Name = "Device 13",    
                    PatientId = 1,          
                    Patientinfo = "Negative",
                    Isactive = true,
                    Status = "Assigned"
                },
                new Device {
                    Id = 4027,
                  Name = "crt",
                  PatientId = 4009,
                  Patientinfo = "pos",
                  Isactive = true,
                  Status = "Assigned"

                },
                new Device
                {
                    Id = 4029,
                    Name  = "PR",
                    PatientId = 4016,
                    Patientinfo = "YET TO DECLARE",
                    Isactive=true,
                    Status = "Assigned"

                }

            };

            _context.Device.AddRange(devices);
            _context.SaveChanges();
        }

        [Fact]
        public void GetDevice_ReturnsListOfDevices()
        {
            
            var result = _controller.GetDevice();

           
            Assert.NotNull(result);
            Assert.IsType<List<Device>>(result);
            Assert.NotEmpty(result);
        }

        [Fact]
        public void GetDevice_NoData_ThrowsException()
        {
            
           
            _context.Device.RemoveRange(_context.Device);
            _context.SaveChanges();

           
            var ex = Assert.Throws<Exception>(() => _controller.GetDevice());
            Assert.Equal("No Elements Available", ex.Message);
        }

        [Fact]
        public void GetDeviceById_ExistingDevice_ReturnsOkResult()
        {
            
            int deviceId = 10; 

            
            var result = _controller.GetDeviceById(deviceId);

          
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetDeviceById_NonExistingDevice_ThrowsExceptionAsync()
        {
          
            int deviceId = 12999;

            var ex = await Assert.ThrowsAsync<Exception>(() => (Task)_controller.GetDeviceById(deviceId));
            Assert.Equal("No Elements Available", ex.Message);
        }


        [Fact]
        public void Post_ValidDevice_ReturnsCreatedResult()
        {
            
            var device = new Device
            {
                Name = "Device 13",
                PatientId = 1,
                Patientinfo = "Negative",
                Isactive = true,
                Status = "Assigned"
            };

            
            var result = _controller.Post(device);

           
            Assert.IsType<CreatedResult>(result);
        }

        

        [Fact]
        public void Post_DeviceSavedToDatabase()
        {
            
            var device = new Device
            {
                Name = "Device 13",
                PatientId = 1,
                Patientinfo = "Negative",
                Isactive = true
            };

            
            _controller.Post(device);

            
            var savedDevice = _context.Device.FirstOrDefault();
            Assert.NotNull(savedDevice);
            Assert.Equal(device.Name, savedDevice.Name);
           
           
        }

      
      


       






        public void Dispose()
        {
            _context.Dispose();
        }





    }
}
