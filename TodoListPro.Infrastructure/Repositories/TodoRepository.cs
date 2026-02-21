using Microsoft.EntityFrameworkCore;
using TodoListPro.Core.Entities;
using TodoListPro.Core.Interfaces;
using TodoListPro.Infrastructure.Data;

namespace TodoListPro.Infrastructure.Repositories
{
    public class TodoRepository : GenericRepository<TodoItem>, ITodoRepository
    {
        public TodoRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TodoItem>> GetByUserIdAsync(int userId)
        {
            return await _dbSet
                .Include(t => t.Category)
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<TodoItem>> GetByCategoryAsync(int categoryId)
        {
            return await _dbSet
                .Where(t => t.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<IEnumerable<TodoItem>> GetCompletedAsync(int userId)
        {
            return await _dbSet
                .Include(t => t.Category)
                .Where(t => t.UserId == userId && t.IsCompleted)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<TodoItem>> GetPendingAsync(int userId)
        {
            return await _dbSet
                .Include(t => t.Category)
                .Where(t => t.UserId == userId && !t.IsCompleted)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
    }
}