using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveSolutions.Models
{
    public class SignedInUserModel
    {
        public int CustomerId { get; set; }
        public string Token { get; set; }
    }
}
