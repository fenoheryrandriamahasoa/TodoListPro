using TodoListPro.Core.Entities;

namespace TodoListPro.Core.Interfaces
{
    public interface ITodoRepository : IGenericRepository<TodoItem>
    {
        Task<IEnumerable<TodoItem>> GetByUserIdAsync(int userId);
        Task<IEnumerable<TodoItem>> GetByCategoryAsync(int categoryId);
        Task<IEnumerable<TodoItem>> GetCompletedAsync(int userId);
        Task<IEnumerable<TodoItem>> GetPendingAsync(int userId);
    }
}