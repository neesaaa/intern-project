using DomainLayer.Models;
using Microsoft.AspNetCore.Http;
using Shared.CourseDtos;

public class AddOrUpdateCourseDto
{
    public int? Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int InstructorId { get; set; }
    public Category Category { get; set; }
    public Level Level { get; set; }
    public decimal Cost { get; set; }
    public decimal Rate { get; set; }
    public decimal TotalHours { get; set; }
    public string Certification { get; set; } = string.Empty;
    public IFormFile? ImageFile { get; set; }
    public string? ExistingImagePath { get; set; } 

    public ICollection<CourseSectionDto> Sections { get; set; } = new List<CourseSectionDto>();
}