using System.ComponentModel.DataAnnotations;

namespace Shared.BasketDtos
{
    public class BasketItemDto
    {
        public int Id { get; set; }
        public string CourseName { get; set; } = default!;
         
        public string PictureUrl { get; set; }= default!;
        public int TotalHours { get; set; }
        public int TotalLectures { get; set; }
        public string InstructorName { get; set; } = default!;
        [Range(1,double.MaxValue)]
        public decimal Cost { get; set; }
        public decimal Rate { get; set; }


    }
}