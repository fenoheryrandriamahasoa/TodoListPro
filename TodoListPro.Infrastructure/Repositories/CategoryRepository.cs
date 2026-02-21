using Microsoft.EntityFrameworkCore;
using TodoListPro.Core.Entities;
using TodoListPro.Core.Interfaces;
using TodoListPro.Infrastructure.Data;

namespace TodoListPro.Infrastructure.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _dbSet.FirstOrDefaultAsync(c => c.Name == name);
        }
    }
}