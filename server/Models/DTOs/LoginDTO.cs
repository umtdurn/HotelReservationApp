﻿using System;
namespace HotelReservationAPI.Models.DTOs
{
	public class LoginDTO
	{
		public string Mail { get; set; } = string.Empty;

		public string Password { get; set; } = string.Empty;
	}
}

