using System;
using HotelReservationAPI.AbstractServices.MongoServiceAbstract;
using HotelReservationAPI.Models;
using MongoDB.Driver;

namespace HotelReservationAPI.ConcreteServices.MongoServiceConcrete
{
	public class MongoService : IMongoService
	{

        private IMongoDatabase _database;

        public MongoService(IConfiguration configuration)
		{
            var client = new MongoClient(configuration["MongoDbSettings:ConnectionString"]);
            _database = client.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);
        }

        public async Task AddDocumentAsync<T>(string collectionName, T document)
        {
            var collection = _database.GetCollection<T>(collectionName);
            await collection.InsertOneAsync(document);
        }

        public async Task<List<T>> GetAllDocumentsAsync<T>(string collectionName)
        {
            var collection = _database.GetCollection<T>(collectionName);
            return await collection.Find(x => true).ToListAsync();
        }

        public async Task<T> GetDocumentByIdAsync<T>(string collectionName, string id)
        {
            var collection = _database.GetCollection<T>(collectionName);
            return await collection.Find(Builders<T>.Filter.Eq("Id", id)).FirstOrDefaultAsync();
        }

        public async Task DeleteDocumentAsync<T>(string collectionName, string id)
        {
            var collection = _database.GetCollection<T>(collectionName);
            await collection.DeleteOneAsync(Builders<T>.Filter.Eq("Id", id));
        }

        public async Task UpdateDocumentAsync<T>(string collectionName, string id, T document)
        {
            var collection = _database.GetCollection<T>(collectionName);
            await collection.ReplaceOneAsync(Builders<T>.Filter.Eq("Id", id), document);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var collection = _database.GetCollection<User>("Users");
            return await collection.Find(Builders<User>.Filter.Eq("Email", email)).FirstOrDefaultAsync();
        }
    }
}

