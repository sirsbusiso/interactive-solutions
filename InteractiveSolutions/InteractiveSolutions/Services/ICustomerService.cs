using InteractiveSolutions.Models;
using System.Threading.Tasks;

namespace InteractiveSolutions.Services
{
    public interface ICustomerService
    {
        Task<SignedInUserModel> Login(LoginModel login);
    }
}