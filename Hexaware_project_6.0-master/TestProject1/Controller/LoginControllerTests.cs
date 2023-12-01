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

    public class YourControllerTests
    {
        [Fact]
        public void Post_ValidUser_ReturnsOkResult()
        {
            
            var email = "kamal@gmail.com";
            var password = "kamal123#";
            var user = new Signup { Email = email, Password = password };

            var dbContext = new Mock<CTRMDBContext>(); 

           
            var userCollection = new List<Signup> { user };

           
            var userDbSet = new Mock<DbSet<Signup>>();
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.Provider).Returns(userCollection.AsQueryable().Provider);
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.Expression).Returns(userCollection.AsQueryable().Expression);
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.ElementType).Returns(userCollection.AsQueryable().ElementType);
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.GetEnumerator()).Returns(() => userCollection.AsQueryable().GetEnumerator());

            dbContext.Setup(c => c.Signup).Returns(userDbSet.Object);

            var controller = new LoginController(dbContext.Object,null) ; // Replace with your controller type

            
            var result = controller.Post(email, password) as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal("Authorized", result.Value);
        }

        [Fact]
        public void Post_InvalidUser_ReturnsUnauthorizedResult()
        {
            
            var email = "938ujr@example.com";
            var password = "..invaedlk2lidPassword";

            var dbContext = new Mock<CTRMDBContext>(); 

           
            var userCollection = new List<Signup>();

            
            var userDbSet = new Mock<DbSet<Signup>>();
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.Provider).Returns(userCollection.AsQueryable().Provider);
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.Expression).Returns(userCollection.AsQueryable().Expression);
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.ElementType).Returns(userCollection.AsQueryable().ElementType);
            userDbSet.As<IQueryable<Signup>>().Setup(m => m.GetEnumerator()).Returns(() => userCollection.AsQueryable().GetEnumerator());

            dbContext.Setup(c => c.Signup).Returns(userDbSet.Object);

            var controller = new LoginController(dbContext.Object,null); 

           
            var result = controller.Post(email, password) as UnauthorizedResult;

            
            Assert.NotNull(result);
        }
    }
}
