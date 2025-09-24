using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models
{
    public enum Title
    {
        [Display(Name = "UI/UX")]
        UI_UX,
        Development

    }
}
