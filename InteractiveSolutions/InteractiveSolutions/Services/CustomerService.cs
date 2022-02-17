using InteractiveSolutions.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace InteractiveSolutions.Services
{
    public class CustomerService : ICustomerService
    {
        private IConfiguration _config;

        public CustomerService(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("InteractiveDBConnection"));
            }
        }

        public async Task<SignedInUserModel> Login(LoginModel login)
        {
            using var connection = Connection;            

            var customer = await connection.QueryFirstOrDefaultAsync<Customer>("SELECT * FROM tb_Customer WHERE IdNumber = @IdNumber",
                new { IdNumber = login.IdNumber });

            if (customer != null)
            {
                var tokenString = GenerateJSONWebToken();

                var signedInUser = new SignedInUserModel
                {
                    CustomerId = customer.Id,
                    Token = tokenString
                };

                return signedInUser;
            }

            return null;
        }

        private string GenerateJSONWebToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
