using TodoListPro.Core.Entities;

namespace TodoListPro.Core.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByUsernameAsync(string username);
        Task<bool> UserExistsAsync(string email);
    }
}