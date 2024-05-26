using System;
using HotelReservationAPI.Models;

namespace HotelReservationAPI.AbstractServices.UserServiceAbstract
{
	public interface IUserService
	{
		public Task<bool> Login(User user,string inputPassword);

		public Task<bool> CreateUser(User user);

		public Task<User> GetUser(string email);

		//public Task<bool> UpdateUser(User user);
	}
}

