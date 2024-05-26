﻿using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HotelReservationAPI.Models
{
	public class User
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		public string FirstName { get; set; } = string.Empty;

		public string LastName { get; set; } = string.Empty;

		public string UserName { get; set; } = string.Empty;

		public string Password { get; set; } = string.Empty;
	
		public string Email { get; set; } = string.Empty;
	}
}

