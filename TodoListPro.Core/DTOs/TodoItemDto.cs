using System.ComponentModel.DataAnnotations;
using TodoListPro.Core.Entities;

namespace TodoListPro.Core.DTOs
{
    public class CreateTodoDto
    {
        [Required(ErrorMessage = "Le titre est requis")]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        public Priority Priority { get; set; } = Priority.Medium;

        public DateTime? DueDate { get; set; }

        public int? CategoryId { get; set; }
    }

    public class UpdateTodoDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        public bool IsCompleted { get; set; }

        public Priority Priority { get; set; }

        public DateTime? DueDate { get; set; }

        public int? CategoryId { get; set; }
    }

    public class TodoItemResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public Priority Priority { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryColor { get; set; }
    }
}