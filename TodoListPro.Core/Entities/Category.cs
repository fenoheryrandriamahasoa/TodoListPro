namespace TodoListPro.Core.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = "#3B82F6"; // Couleur par défaut

        // Navigation property
        public ICollection<TodoItem> TodoItems { get; set; } = new List<TodoItem>();
    }
}