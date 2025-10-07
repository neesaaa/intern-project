using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Exceptions
{
    public class NotFoundInstructor(int id):NotFoundException($"Instructor with {id} is not found")
    {
    }
}
