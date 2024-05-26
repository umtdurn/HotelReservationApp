using System;
using HotelReservationAPI.Models;

namespace HotelReservationAPI.AbstractServices.ProductServiceAbstract
{
	public interface IProductService
	{
		public Task<AllProductResponseDTO> GetAllProduct(int pageNumber);

		public Task<AllProductResponseDTO> GetProductsBySearchKeyword(string keyword, int pageNumber);

		public Task<Product> GetProductById(string id);
	}
}

