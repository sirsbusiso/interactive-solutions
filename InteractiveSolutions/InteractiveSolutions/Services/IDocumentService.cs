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
        Task<int> Upload(List<Document> documents);

        Task<FileStream> Download(int id);
    }
}