using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hexaware_project___WEBAPI.Models
{
    public partial class Device
    {
      

        public int Id { get; set; }
        public string Name { get; set; }



        public string PatientEmail { get; set; }

        [ForeignKey(nameof(Patient))]
        public int? PatientId { get; set; }

       
        public string Patientinfo { get; set; }

        public bool? Isactive { get; set; }

        public string Status { get; set; }

        public int Count { get; set; }


    }
}
