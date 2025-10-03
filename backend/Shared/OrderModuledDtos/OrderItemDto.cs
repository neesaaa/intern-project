namespace Shared.OrderModuledDtos
{
    public class OrderItemDto
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; } = default!;
        public string ImageUrl { get; set; } = default!;
        public decimal Cost { get; set; }

    }
}