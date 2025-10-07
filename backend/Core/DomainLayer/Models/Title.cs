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
        UI_UX = 0,

        [Display(Name = "Development")]
        Development = 1,

        [Display(Name = "Frontend Developer")]
        Frontend = 2,

        [Display(Name = "Backend Developer")]
        Backend = 3

    }
}
