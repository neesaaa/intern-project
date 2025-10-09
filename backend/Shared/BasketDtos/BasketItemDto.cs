using System.ComponentModel.DataAnnotations;

namespace Shared.BasketDtos
{
    public class BasketItemDto
    {
        public int Id { get; set; }

        public string CourseName { get; set; } = string.Empty;

        public string PictureUrl { get; set; } = string.Empty;

        public int TotalHours { get; set; }

        public int TotalLectures { get; set; }

        public string InstructorName { get; set; } = string.Empty;

        public decimal Cost { get; set; }

        public decimal Rate { get; set; }


    }
}