using System;
using HotelReservationAPI.AbstractServices.MongoServiceAbstract;
using HotelReservationAPI.AbstractServices.UserServiceAbstract;
using HotelReservationAPI.Models;
using HotelReservationAPI.Helpers;

namespace HotelReservationAPI.ConcreteServices.UserServiceConcrete
{
	public class UserService : IUserService
	{

        private readonly IMongoService _mongoService;
		public UserService(IMongoService mongoService)
		{
            _mongoService = mongoService;
		}

        public async Task<bool> CreateUser(User user)
        {
            try
            {
                user.Password = HashingHelper.HashPassword(user.Password);
                await _mongoService.AddDocumentAsync<User>("Users", user);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<User> GetUser(string email)
        {
            var dbUser = await _mongoService.GetUserByEmail(email);
            return dbUser;
        }

        public async Task<bool> Login(User user, string inputPassword)
        {
            try
            {
                if (user is null) return false;

                //var dbUser = await _mongoService.GetDocumentByIdAsync<User>("Users", user.Id);
                var dbUser = await _mongoService.GetUserByEmail(user.Email);

                if (dbUser is null) return false;

                //bool usernameCheck = false;
                //if(dbUser.UserName == user.UserName)
                //{
                //    usernameCheck = true;
                //}
                var passwordCheck = HashingHelper.VerifyPassword(dbUser.Password, inputPassword);
                //var passwordCheck2 = HashingHelper.VerifyPassword2(dbUser.Password, inputPassword);

                if (passwordCheck)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}

