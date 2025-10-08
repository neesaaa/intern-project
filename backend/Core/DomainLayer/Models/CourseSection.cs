        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Text;
        using System.Threading.Tasks;

        namespace DomainLayer.Models
        {
            public class CourseSection:BaseEntity
            {
                public string Name { get; set; } = default!;
                public int LecturesNumber { get; set; }
                public decimal TotalHours { get; set; }

            }
        }
