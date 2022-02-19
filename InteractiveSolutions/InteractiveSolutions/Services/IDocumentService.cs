using InteractiveSolutions.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace InteractiveSolutions.Services
{
    public interface IDocumentService
    {
        Task<int> Delete(int id);
        Task<List<Document>> GetAllByCustomer(int custId);
        Task<Document> GetById(int id);
        Task<int> Upload(List<Document> documents);
    }
}