using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HotelReservationAPI.AbstractServices.ProductServiceAbstract;
using HotelReservationAPI.AbstractServices.UserServiceAbstract;
using HotelReservationAPI.Helpers;
using HotelReservationAPI.Models;
using HotelReservationAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.IdentityModel.Tokens;

namespace HotelReservationAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HotelReservationController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IProductService _productService;
        public HotelReservationController(IUserService userService, IProductService productService)
        {
            _userService = userService;
            _productService = productService;
        }

[HttpPost("Login")]
public async Task<IActionResult> Login([FromBody] LoginDTO dto)
{
    var user = await _userService.GetUser(dto.Mail);
    if (user == null)
    {
        return Unauthorized("User not found");
    }

    var check = await _userService.Login(user, dto.Password);
    if (check)
    {
        string jwtToken = JwtTokenHelper.GenerateJwtToken(user);
        return Ok(new { Token = jwtToken });
    }
    else
    {
        return StatusCode(500, "Login failed");
    }
}

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            User user = new User()
            {
                UserName = dto.UserName,
                Email = dto.Mail,
                Password = dto.Password
            };
            var insertCheck = await _userService.CreateUser(user);

            return StatusCode(201);
        }

        [HttpGet("GetAllProducts")]
        public async Task<AllProductResponseDTO> GetAllProducts(int page)
        {
            var response =  await _productService.GetAllProduct(page);

            //if (allProducts is null) { return new AllProductResponseDTO(); }

            //int totalCount = allProducts.Count();
            //int totalPage = totalCount / 12;
            //if(totalCount % 12 != 0)
            //{
            //    totalPage += 1;
            //}

            //AllProductResponseDTO response = new AllProductResponseDTO()
            //{
            //    data = allProducts,
            //    page = page,
            //    totalPage = totalPage
            //};


            return response;
        }

        [HttpGet("GetProductsByKeyword")]
        public async Task<AllProductResponseDTO> GetProductsByKeyword(string keyword,int page)
        {
            var responseDTO = await _productService.GetProductsBySearchKeyword(keyword, page);

            if(responseDTO is null ) { return new AllProductResponseDTO(); }

            //int totalCount = products.Count();
            //int totalPage = totalCount / 12;
            //if (totalCount % 12 != 0)
            //{
            //    totalPage += 1;
            //}

            //AllProductResponseDTO response = new AllProductResponseDTO()
            //{
            //    data = products,
            //    page = page,
            //    totalPage = totalPage
            //};

            return responseDTO;
        }

        [HttpGet("GetSingleProduct")]
        public async Task<Product> GetSingleProduct(string id)
        {
            var product = await _productService.GetProductById(id);

            if(product is null) { return new Product(); }

            return product;
        }

        [HttpPost("CheckToken")]
        public IActionResult CheckToken([FromBody] TokenDTO dto)
        {
            if (string.IsNullOrEmpty(dto.Token))
            {
                return BadRequest("Token boş olamaz.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("IjdRvkvv9USBI7XUsDbWyarETKhmnBy5");

            try
            {
                tokenHandler.ValidateToken(dto.Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return Ok("Token geçerli.");
            }
            catch
            {
                return BadRequest("Token geçersiz.");
            }
        }

    }
}

