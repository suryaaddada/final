using System;
using System.Collections.Generic;

namespace Hexaware_project___WEBAPI.Models
{
    public partial class Signup
    {
        public int Signupid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public long Mobile { get; set; }
        public bool? Isactive { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
