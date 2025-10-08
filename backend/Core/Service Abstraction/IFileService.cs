using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Abstraction
{
    public interface IFileService
    {
        Task<string> SaveImageAsync(IFormFile imageFile, string folderName);
        Task<bool> DeleteImageAsync(string imagePath);
        string GetImageUrl(string imagePath);
    }
}
