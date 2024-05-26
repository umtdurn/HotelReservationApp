using System;
using HotelReservationAPI.Models;
namespace HotelReservationAPI.AbstractServices.MongoServiceAbstract
{
	public interface IMongoService
	{
        public Task AddDocumentAsync<T>(string collectionName, T document);

        public Task<List<T>> GetAllDocumentsAsync<T>(string collectionName);

        public Task<T> GetDocumentByIdAsync<T>(string collectionName, string id);

        public Task UpdateDocumentAsync<T>(string collectionName, string id, T document);

        public Task DeleteDocumentAsync<T>(string collectionName, string id);

        public Task<User> GetUserByEmail(string email);
    }
}

