using DomainLayer.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Data
{
    public class DataSeeding(AppDbContext _context):IDataSeeding
    {
        public async Task DataSeedAsync()
        {
            var migs = await _context.Database.GetPendingMigrationsAsync();
            if (migs.Any())
            {
                await _context.Database.MigrateAsync();
            }
            var coursesexists= await _context.Courses.AnyAsync();
            if (!coursesexists)
            {

            }
        }


        
    }
}
