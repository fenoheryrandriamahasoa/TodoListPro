namespace TodoListPro.Core.Entities
{
    public enum Priority
    {
        Low = 1,
        Medium = 2,
        High = 3
    }

    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public Priority Priority { get; set; } = Priority.Medium;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }

        // Foreign Keys
        public int UserId { get; set; }
        public int? CategoryId { get; set; }

        // Navigation properties
        public User User { get; set; } = null!;
        public Category? Category { get; set; }
    }
}