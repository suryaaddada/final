using System;
using System.Collections.Generic;

namespace Hexaware_project___WEBAPI.Models
{
    public partial class Nurse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public long Mobile { get; set; }
        public string Email { get; set; }
        public int? PatientId { get; set; }
        public int? DeviceId { get; set; }

   public string PatientName { get; set; }
   public string DeviceName { get; set; }
        public string Result { get; set; }
 
        public string Status { get; set; }
        public bool? Isactive { get; set; }

     
    }
}
