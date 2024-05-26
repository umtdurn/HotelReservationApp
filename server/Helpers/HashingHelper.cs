using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace HotelReservationAPI.Helpers
{
	public static class HashingHelper
	{
        public static string HashPassword(string password)
        {
            // Rastgele bir salt oluştur
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Şifreyi hashle
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Salt ve hash'i birleştirerek saklamak üzere döndür
            return $"{Convert.ToBase64String(salt)}:{hashed}";
        }

        public static bool VerifyPassword(string hashedPasswordWithSalt, string passwordToVerify)
        {
            // Salt ve hash'i ayır
            var parts = hashedPasswordWithSalt.Split(':');
            if (parts.Length != 2)
            {
                return false;
            }

            var salt = Convert.FromBase64String(parts[0]);
            var storedHash = parts[1];

            // Gelen şifreyi aynı salt ile hashle
            var hashOfInput = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: passwordToVerify,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Hash'leri karşılaştır
            return hashOfInput == storedHash;
        }

        public static bool VerifyPassword2(string hashedPasswordWithSalt, string passwordToVerify)
        {
            var hashedInput = HashingHelper.HashPassword(passwordToVerify);
            return hashedPasswordWithSalt == hashedInput;
        }

    }
}

