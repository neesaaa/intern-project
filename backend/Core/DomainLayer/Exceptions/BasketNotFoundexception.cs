using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Exceptions
{
    public class BasketNotFoundexception(int id):NotFoundException($"Basket of id {id} is Unfoundable")
    {
    }
}
