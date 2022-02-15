using System;
using System.Collections.Generic;

namespace InteractiveSolutions.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int? Age { get; set; }
        public DateTime? DoB { get; set; }
        public string IdNumber { get; set; }
    }
}
