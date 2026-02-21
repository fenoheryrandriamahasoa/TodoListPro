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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// Récupérer toutes les catégories
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryResponseDto>>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();

            var categoryDtos = categories.Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Color = c.Color
            });

            return Ok(categoryDtos);
        }

        /// <summary>
        /// Récupérer une catégorie par son ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryResponseDto>> GetCategoryById(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound(new { message = "Catégorie introuvable" });
            }

            var categoryDto = new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
                Color = category.Color
            };

            return Ok(categoryDto);
        }

        /// <summary>
        /// Créer une nouvelle catégorie
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<CategoryResponseDto>> CreateCategory([FromBody] CreateCategoryDto createCategoryDto)
        {
            // Vérifier si la catégorie existe déjà
            var existingCategory = await _categoryRepository.GetByNameAsync(createCategoryDto.Name);
            if (existingCategory != null)
            {
                return BadRequest(new { message = "Cette catégorie existe déjà" });
            }

            var category = new Category
            {
                Name = createCategoryDto.Name,
                Color = createCategoryDto.Color
            };

            await _categoryRepository.AddAsync(category);

            var categoryDto = new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
                Color = category.Color
            };

            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, categoryDto);
        }

        /// <summary>
        /// Supprimer une catégorie
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound(new { message = "Catégorie introuvable" });
            }

            await _categoryRepository.DeleteAsync(category);

            return NoContent();
        }
    }
}