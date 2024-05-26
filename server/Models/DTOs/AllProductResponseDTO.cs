using System;
namespace HotelReservationAPI.Models
{
	public class AllProductResponseDTO
	{
		public List<Product> data { get; set; } = new List<Product>();

		public int totalPage { get; set; }

		public int page { get; set; }
	}
}

