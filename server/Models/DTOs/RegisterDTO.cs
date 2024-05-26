using System;
namespace HotelReservationAPI.Models.DTOs
{
	public class RegisterDTO
	{
		public string UserName { get; set; } = string.Empty;

		public string Mail { get; set; } = string.Empty;

		public string Password { get; set; } = string.Empty;
	}
}

