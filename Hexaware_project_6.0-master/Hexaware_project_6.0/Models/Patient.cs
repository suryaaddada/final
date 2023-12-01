using System;
using System.Collections.Generic;

namespace Hexaware_project___WEBAPI.Models
{
    public partial class Patient
    {
        public Patient()
        {
            Device = new HashSet<Device>();
            Nurse = new HashSet<Nurse>();
        }

        public int Id { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Gender { get; set; }
        public DateTime Dob { get; set; }
        public string Address { get; set; }
        public long Mobile { get; set; }
        public DateTime Date { get; set; }
        public string Email { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Device> Device { get; set; }
        public virtual ICollection<Nurse> Nurse { get; set; }
    }
}
