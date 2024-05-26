using System;
using System.Xml.Linq;
using HotelReservationAPI.AbstractServices.MongoServiceAbstract;
using HotelReservationAPI.AbstractServices.ProductServiceAbstract;
using HotelReservationAPI.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MongoDB.Driver;

namespace HotelReservationAPI.ConcreteServices
{
    public class ProductService : IProductService
    {
        private readonly IMongoService _mongoService;
        private readonly IMongoCollection<Product> _products;

        public ProductService(IConfiguration configuration,IMongoService mongoService)
        {
            _mongoService = mongoService;
            var client = new MongoClient(configuration["MongoDbSettings:ConnectionString"]);
            var database = client.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);
            _products = database.GetCollection<Product>("Booking");

            //// Text index oluşturma
            var indexKeysDefinition = Builders<Product>.IndexKeys
                .Text(p => p.Title)
                .Text(p => p.Location)
                .Text(p => p.Highlights);
            _products.Indexes.CreateOne(new CreateIndexModel<Product>(indexKeysDefinition));
        }

        public async Task<AllProductResponseDTO> GetAllProduct(int page)
        {

            int skip = (page - 1) * 12;
            
            // Hesapla sayfa başına kaç ürün düşeceğini ve kaçıncı üründen başlanacağını
            var query = await _products.Find(_ => true)
                                   .Skip(skip)
                                   .Limit(12)
                                   .ToListAsync();
            var allData = await _products.Find(_ => true).ToListAsync();
            int totalCount = allData.Count();

            List<Product> allProducts = query;

            if (allProducts is null) { return new AllProductResponseDTO(); }

            //int totalCount = allProducts.Count();
            int totalPage = totalCount / 12;
            if (totalCount % 12 != 0)
            {
                totalPage += 1;
            }

            AllProductResponseDTO response = new AllProductResponseDTO()
            {
                data = allProducts,
                page = page,
                totalPage = totalPage
            };


            // Veritabanından ürünleri getir ve listele
            return response;
        }

        public async Task<Product> GetProductById(string id)
        {
            var product = await _mongoService.GetDocumentByIdAsync<Product>("Booking", id);
            return product;
        }

        public async Task<AllProductResponseDTO> GetProductsBySearchKeyword(string keyword, int page = 1)
        {
            int skip = (page - 1) * 12;

            // Text search sorgusu oluştur
            var filter = Builders<Product>.Filter.Text(keyword);

            var data = await _products.Find(filter)
                                   .Skip(skip)
                                   .Limit(12)
                                   .ToListAsync();

            var allProducts = await _products.Find(filter)
                                    .ToListAsync();

            int totalCount = allProducts.Count();
            int totalPage = totalCount / 12;
            if (totalCount % 12 != 0)
            {
                totalPage += 1;
            }

            if(data is null) { return new AllProductResponseDTO(); }

            AllProductResponseDTO response = new AllProductResponseDTO()
            {
                data = data,
                page = page,
                totalPage = totalPage
            };


            // Veritabanından ürünleri getir ve listele
            return response;
        }
    }
}

