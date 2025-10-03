using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Exceptions
{
    public class NotFoundCourse(int id):NotFoundException($"the course with {id} isn't found")
    {
    }
}
