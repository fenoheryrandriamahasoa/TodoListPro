using System.ComponentModel.DataAnnotations;

namespace TodoListPro.Core.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "L'email est requis")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le mot de passe est requis")]
        public string Password { get; set; } = string.Empty;
    }
}