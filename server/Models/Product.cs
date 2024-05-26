using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HotelReservationAPI.Models
{
	public class Product
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("thumbnail")]
        public string Thumbnail { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("stars")]
        public int? Stars { get; set; } // Nullable int for stars since it can be null

        [BsonElement("preferredBadge")]
        public bool PreferredBadge { get; set; }

        [BsonElement("promotedBadge")]
        public bool PromotedBadge { get; set; }

        [BsonElement("location")]
        public string Location { get; set; }

        [BsonElement("subwayAccess")]
        public bool SubwayAccess { get; set; }

        [BsonElement("sustainability")]
        public string Sustainability { get; set; }

        [BsonElement("distanceFromCenter")]
        public double DistanceFromCenter { get; set; }

        [BsonElement("highlights")]
        public List<string> Highlights { get; set; } // List of strings for highlights

        [BsonElement("price")]
        public PriceDetails Price { get; set; } // Nested class for price

        [BsonElement("rating")]
        public RatingDetails Rating { get; set; } // Nested class for rating

        [BsonElement("link")]
        public string Link { get; set; }

        public class PriceDetails
        {
            [BsonElement("currency")]
            public string Currency { get; set; }

            [BsonElement("value")]
            public int Value { get; set; }

            [BsonElement("taxesAndCharges")]
            public decimal? TaxesAndCharges { get; set; } // Nullable decimal for taxes and charges
        }

        public class RatingDetails
        {
            [BsonElement("score")]
            public double Score { get; set; }

            [BsonElement("scoreDescription")]
            public string ScoreDescription { get; set; }

            [BsonElement("reviews")]
            public int Reviews { get; set; }
        }
    }
}

