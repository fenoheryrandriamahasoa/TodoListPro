using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoListPro.Core.DTOs;
using TodoListPro.Core.Entities;
using TodoListPro.Core.Interfaces;

namespace TodoListPro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TodosController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodosController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim ?? "0");
        }

        /// <summary>
        /// Récupérer toutes les tâches de l'utilisateur connecté
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemResponseDto>>> GetAllTodos()
        {
            var userId = GetCurrentUserId();
            var todos = await _todoRepository.GetByUserIdAsync(userId);

            var todoDtos = todos.Select(t => new TodoItemResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                Priority = t.Priority,
                CreatedAt = t.CreatedAt,
                DueDate = t.DueDate,
                CategoryId = t.CategoryId,
                CategoryName = t.Category?.Name,
                CategoryColor = t.Category?.Color
            });

            return Ok(todoDtos);
        }

        /// <summary>
        /// Récupérer les tâches en cours
        /// </summary>
        [HttpGet("pending")]
        public async Task<ActionResult<IEnumerable<TodoItemResponseDto>>> GetPendingTodos()
        {
            var userId = GetCurrentUserId();
            var todos = await _todoRepository.GetPendingAsync(userId);

            var todoDtos = todos.Select(t => new TodoItemResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                Priority = t.Priority,
                CreatedAt = t.CreatedAt,
                DueDate = t.DueDate,
                CategoryId = t.CategoryId,
                CategoryName = t.Category?.Name,
                CategoryColor = t.Category?.Color
            });

            return Ok(todoDtos);
        }

        /// <summary>
        /// Récupérer les tâches terminées
        /// </summary>
        [HttpGet("completed")]
        public async Task<ActionResult<IEnumerable<TodoItemResponseDto>>> GetCompletedTodos()
        {
            var userId = GetCurrentUserId();
            var todos = await _todoRepository.GetCompletedAsync(userId);

            var todoDtos = todos.Select(t => new TodoItemResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                Priority = t.Priority,
                CreatedAt = t.CreatedAt,
                DueDate = t.DueDate,
                CategoryId = t.CategoryId,
                CategoryName = t.Category?.Name,
                CategoryColor = t.Category?.Color
            });

            return Ok(todoDtos);
        }

        /// <summary>
        /// Récupérer une tâche par son ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemResponseDto>> GetTodoById(int id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);

            if (todo == null)
            {
                return NotFound(new { message = "Tâche introuvable" });
            }

            // Vérifier que la tâche appartient à l'utilisateur
            if (todo.UserId != GetCurrentUserId())
            {
                return Forbid();
            }

            var todoDto = new TodoItemResponseDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.IsCompleted,
                Priority = todo.Priority,
                CreatedAt = todo.CreatedAt,
                DueDate = todo.DueDate,
                CategoryId = todo.CategoryId,
                CategoryName = todo.Category?.Name,
                CategoryColor = todo.Category?.Color
            };

            return Ok(todoDto);
        }

        /// <summary>
        /// Créer une nouvelle tâche
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<TodoItemResponseDto>> CreateTodo([FromBody] CreateTodoDto createTodoDto)
        {
            var userId = GetCurrentUserId();

            var todo = new TodoItem
            {
                Title = createTodoDto.Title,
                Description = createTodoDto.Description,
                Priority = createTodoDto.Priority,
                DueDate = createTodoDto.DueDate,
                CategoryId = createTodoDto.CategoryId,
                UserId = userId,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            await _todoRepository.AddAsync(todo);

            var todoDto = new TodoItemResponseDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.IsCompleted,
                Priority = todo.Priority,
                CreatedAt = todo.CreatedAt,
                DueDate = todo.DueDate,
                CategoryId = todo.CategoryId
            };

            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todoDto);
        }

        /// <summary>
        /// Mettre à jour une tâche
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTodo(int id, [FromBody] UpdateTodoDto updateTodoDto)
        {
            var todo = await _todoRepository.GetByIdAsync(id);

            if (todo == null)
            {
                return NotFound(new { message = "Tâche introuvable" });
            }

            // Vérifier que la tâche appartient à l'utilisateur
            if (todo.UserId != GetCurrentUserId())
            {
                return Forbid();
            }

            todo.Title = updateTodoDto.Title;
            todo.Description = updateTodoDto.Description;
            todo.IsCompleted = updateTodoDto.IsCompleted;
            todo.Priority = updateTodoDto.Priority;
            todo.DueDate = updateTodoDto.DueDate;
            todo.CategoryId = updateTodoDto.CategoryId;

            await _todoRepository.UpdateAsync(todo);

            return NoContent();
        }

        /// <summary>
        /// Supprimer une tâche
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);

            if (todo == null)
            {
                return NotFound(new { message = "Tâche introuvable" });
            }

            // Vérifier que la tâche appartient à l'utilisateur
            if (todo.UserId != GetCurrentUserId())
            {
                return Forbid();
            }

            await _todoRepository.DeleteAsync(todo);

            return NoContent();
        }

        /// <summary>
        /// Marquer une tâche comme terminée/non terminée
        /// </summary>
        [HttpPatch("{id}/toggle")]
        public async Task<ActionResult> ToggleTodoStatus(int id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);

            if (todo == null)
            {
                return NotFound(new { message = "Tâche introuvable" });
            }

            if (todo.UserId != GetCurrentUserId())
            {
                return Forbid();
            }

            todo.IsCompleted = !todo.IsCompleted;
            await _todoRepository.UpdateAsync(todo);

            return NoContent();
        }
    }
}