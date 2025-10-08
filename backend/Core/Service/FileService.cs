using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Service_Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileService(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> SaveImageAsync(IFormFile imageFile, string folder)
        {
            if (imageFile == null || imageFile.Length == 0)
                return null;

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
            var fileExtension = Path.GetExtension(imageFile.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(fileExtension))
                throw new ArgumentException("Invalid file type. Only image files are allowed.");

            if (imageFile.Length > 5 * 1024 * 1024)
                throw new ArgumentException("File size too large. Maximum size is 5MB.");

            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var folderName = folder.ToString().ToLower();
            var folderPath = Path.Combine(_environment.WebRootPath, "images", folderName);

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return Path.Combine("images", folderName, fileName).Replace("\\", "/");
        }

        public async Task<bool> DeleteImageAsync(string imagePath)
        {
            if (string.IsNullOrEmpty(imagePath))
                return false;

            var fullPath = Path.Combine(_environment.WebRootPath, imagePath);
            if (File.Exists(fullPath))
            {
                await Task.Run(() => File.Delete(fullPath));
                return true;
            }
            return false;
        }

        public string GetImageUrl(string imagePath)
        {
            if (string.IsNullOrEmpty(imagePath))
                return null;

            HttpRequest request = _httpContextAccessor.HttpContext.Request;
            return $"{request.Scheme}://{request.Host}/{imagePath}";
        }
    }
}
