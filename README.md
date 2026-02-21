# 📝 TodoList Pro - Application Fullstack

![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?logo=angular)
![SQL Server](https://img.shields.io/badge/SQL%20Server-Express-CC2927?logo=microsoftsqlserver)

Application de gestion de tâches moderne avec authentification JWT.

## 🎯 Fonctionnalités

### ✅ Backend (API .NET Core)
- 🔐 Authentification & Autorisation JWT
- 👤 Gestion des utilisateurs (Register/Login)
- ✏️ CRUD complet des tâches (Create, Read, Update, Delete)
- 🏷️ Système de catégories
- 🎨 Filtres (tâches terminées, en cours, par priorité)
- 📊 Dashboard avec statistiques
- 🔍 Recherche en temps réel

### 🎨 Frontend (Angular - En développement)
- Interface moderne et responsive
- Authentification avec guards
- Formulaires réactifs
- Gestion d'état
- Design Material

## 🛠️ Technologies Utilisées

### Backend
- **Framework**: ASP.NET Core 10.0 Web API
- **ORM**: Entity Framework Core
- **Base de données**: SQL Server Express
- **Authentication**: JWT (JSON Web Tokens)
- **Patterns**: Repository Pattern, Clean Architecture
- **Documentation**: Swagger/OpenAPI

### Frontend (À venir)
- **Framework**: Angular 17+
- **UI**: Angular Material / Bootstrap
- **State Management**: Services / NgRx
- **HTTP Client**: HttpClient avec Interceptors

## 📂 Structure du Projet
TodoListPro/
├── TodoListPro.API/ # Couche Présentation (Controllers)
│ ├── Controllers/
│ │ ├── AuthController.cs
│ │ ├── TodosController.cs
│ │ └── CategoriesController.cs
│ └── Program.cs
│
├── TodoListPro.Core/ # Couche Domaine (Entités, Interfaces)
│ ├── Entities/
│ │ ├── User.cs
│ │ ├── TodoItem.cs
│ │ └── Category.cs
│ ├── Interfaces/
│ │ ├── IAuthService.cs
│ │ ├── IUserRepository.cs
│ │ ├── ITodoRepository.cs
│ │ └── ICategoryRepository.cs
│ └── DTOs/
│
└── TodoListPro.Infrastructure/ # Couche Infrastructure (Data, Repositories)
├── Data/
│ └── AppDbContext.cs
├── Repositories/
│ ├── UserRepository.cs
│ ├── TodoRepository.cs
│ └── CategoryRepository.cs
└── Services/
└── AuthService.cs

## 🚀 Installation et Démarrage

### Prérequis
- .NET 8.0 SDK ou supérieur
- SQL Server Express ou LocalDB
- Visual Studio 2022 / VS Code / Rider
- Git

### 1️⃣ Cloner le repository

```bash
git clone https://github.com/fenoheryrandriamahasoa/TodoListPro.git
cd TodoListPro

### 2️⃣ Configuration de la base de données
Modifier la connection string dans appsettings.json :

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=TodoListProDB;Trusted_Connection=True;TrustServerCertificate=True;"
}

### 3️⃣ Appliquer les migrations

cd TodoListPro.API
dotnet ef database update --project ../TodoListPro.Infrastructure

### 4️⃣ Lancer l'API
  dotnet run

L'API sera accessible sur : https://localhost:7XXX

### 5️⃣ Tester avec Swagger
Ouvrir dans le navigateur :
  https://localhost:7XXX/swagger

## 📖 Utilisation de l'API
### Inscription

POST /api/Auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123"
}

### Connexion

POST /api/Auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123"
}

### Créer une tâche (Authentification requise)

POST /api/Todos
Authorization: Bearer {votre_token}
Content-Type: application/json

{
  "title": "Ma première tâche",
  "description": "Description",
  "priority": 2,
  "categoryId": 1
}

## 🗄️ Modèle de Données
### User
Id (int)
Username (string)
Email (string)
PasswordHash (string)
CreatedAt (DateTime)

### TodoItem
Id (int)
Title (string)
Description (string?)
IsCompleted (bool)
Priority (enum: Low, Medium, High)
CreatedAt (DateTime)
DueDate (DateTime?)
UserId (int)
CategoryId (int?)

### Category
Id (int)
Name (string)
Color (string)

## 📝 Roadmap
 Backend API .NET Core
 Authentication JWT
 CRUD Todos
 Gestion des catégories
 Frontend Angular
 Dashboard avec graphiques
 Notifications
 Export PDF
 Mode sombre
 Tests unitaires
 Déploiement (Azure)