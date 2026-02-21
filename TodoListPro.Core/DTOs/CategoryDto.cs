using System.ComponentModel.DataAnnotations;

namespace TodoListPro.Core.DTOs
{
    public class CreateCategoryDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^#([A-Fa-f0-9]{6})$", ErrorMessage = "Format de couleur invalide. Utilisez #RRGGBB")]
        public string Color { get; set; } = "#3B82F6";
    }

    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}