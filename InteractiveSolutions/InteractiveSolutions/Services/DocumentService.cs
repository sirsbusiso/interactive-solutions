using InteractiveSolutions.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.IO;

namespace InteractiveSolutions.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IConfiguration _config;

        public DocumentService(IConfiguration config)
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

        public async Task<List<Document>> GetAllByCustomer(int custId)
        {
            using var connection = Connection;
            connection.Open();

            var documents = await connection.QueryAsync<Document>("EXEC sp_GetAllDocumentsByCustomer", new { CustId = custId }, commandType: CommandType.StoredProcedure);
            return documents.ToList();
        }

        public async Task<FileStream> Download(int id)
        {
            using var connection = Connection;
            connection.Open();

            FileStream file = null; // continue on this

            var document = await connection.QueryFirstOrDefaultAsync<Document>("EXEC sp_GetDocumentById", new { Id = id }, commandType: CommandType.StoredProcedure);

            if (document != null)
            {
                //convert to file
            }

            return file;
        }

        public async Task<int> Upload(List<Document> documents)
        {
            using var connection = Connection;
            connection.Open();

            var transaction = connection.BeginTransaction();

            int rowCount = 0;

            try
            {
                foreach (var document in documents)
                {
                    rowCount += await connection.ExecuteAsync("sp_AddDocument", param: document, transaction: transaction, commandType: CommandType.StoredProcedure);
                }

                transaction.Commit();

                return rowCount;
            }
            catch
            {
                transaction.Rollback();
                return 0;
            }
        }

        public async Task<int> Delete(int id)
        {
            using var connection = Connection;
            connection.Open();

            var transaction = connection.BeginTransaction();

            try
            {
                int rowCount = await connection.ExecuteAsync("sp_DeleteDocument", new { Id = id }, transaction: transaction, commandType: CommandType.StoredProcedure);
                transaction.Commit();

                return rowCount;
            }
            catch
            {
                transaction.Rollback();
                return 0;
            }
        }
    }
}
