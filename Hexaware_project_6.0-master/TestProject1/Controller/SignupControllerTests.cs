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
using Moq;

namespace TestProject1.Controller
{
    public class SignupControllerTests
    {
        [Fact]
        public void GetSignup_ValidData_ReturnsListOfSignup()
        {
           
            var signupData = new List<Signup>
        {
           
            new Signup
            {
                Signupid = 3,
                Name = "Aditya Bhoyar",
                Email = "aditya@gmail.com",
                Password = "aditya123#",
                Mobile = 7083525723,
                Isactive = true,
                ConfirmPassword = "aditya123#"
            }
        };

            var dbContextOptions = new DbContextOptionsBuilder<CTRMDBContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                .Options;
            var dbContext = new CTRMDBContext(dbContextOptions);
            dbContext.Signup.AddRange(signupData);
            dbContext.SaveChanges();

            var controller = new SignupController(dbContext); 

            
            var result = controller.GetSignup() as List<Signup>;

            Assert.NotNull(result);
            Assert.Equal(signupData.Count, result.Count);
        }

        [Fact]
        public void GetSignup_NoData_ThrowsException()
        {
            
            var dbContextOptions = new DbContextOptionsBuilder<CTRMDBContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                .Options;
            var dbContext = new CTRMDBContext(dbContextOptions);

            var controller = new SignupController(dbContext); 

            var ex = Assert.Throws<System.Exception>(() => controller.GetSignup());
            Assert.Equal("No Login Detail Available", ex.Message);
        }

        [Fact]
        public void Post_ValidData_ReturnsCreatedResult()
        {
            
            var signup = new Signup
            {
                Signupid = 2,
                Name = "Kamal Sutte",
                Email = "kamal@gmail.com",
                Password = "kamal123#",
                Mobile = 7620317944,
                Isactive = true,
                ConfirmPassword = "kamal123#"
            };

            var dbContextOptions = new DbContextOptionsBuilder<CTRMDBContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                .Options;
            var dbContext = new CTRMDBContext(dbContextOptions);

            var controller = new SignupController(dbContext); 

            
            var result = controller.Post(signup) as CreatedResult;

            
            Assert.NotNull(result);
            Assert.Equal("user Added", result.Value);
        }

        [Fact]
        public void Post_ExceptionThrown_ReturnsBadRequestResult()
        {
           
            var signup = new Signup
            {
                Signupid = 20383,
                Name = "vren sdhjkd",
                Mobile = 76203179449,
                Isactive = true,
                ConfirmPassword = "kamal123#"
            };

            var dbContextOptions = new DbContextOptionsBuilder<CTRMDBContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                .Options;
            var dbContext = new CTRMDBContext(dbContextOptions);

            var mockDbContext = new Mock<CTRMDBContext>(dbContextOptions);
            mockDbContext.Setup(c => c.SaveChanges()).Throws(new Exception("Simulated exception"));

            var controller = new SignupController(mockDbContext.Object); 

          
            var result = controller.Post(signup) as BadRequestResult;

           
            Assert.NotNull(result);
        }


        [Fact]
        public void Delete_ValidId_ReturnsOkResult()
        {
            
            var signupId = 4;
            var signup = new Signup
            {
                Signupid = signupId,
                Email = "kamal@gmail.com",
                Password="kamal123#",
                Isactive =  true,
                Name = "kamal",
                ConfirmPassword = "kamal123#"
            };

            var dbContextOptions = new DbContextOptionsBuilder<CTRMDBContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                .Options;
            var dbContext = new CTRMDBContext(dbContextOptions);
            dbContext.Signup.Add(signup);
            dbContext.SaveChanges();

            var controller = new SignupController(dbContext); 

           
            var result = controller.Delete(signupId) as OkResult;

            Assert.NotNull(result);

            
            Assert.False(signup.Isactive);
        }

       


    }
    }
