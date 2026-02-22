# 📝 TodoList Pro - Application Fullstack

![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular)
![SQL Server](https://img.shields.io/badge/SQL%20Server-Express-CC2927?logo=microsoftsqlserver)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-Academic-green)

Application moderne de gestion de tâches

---

## 🎯 Fonctionnalités

### ✅ Backend (API .NET Core)
- 🔐 **Authentification JWT** sécurisée
- 👤 Gestion des utilisateurs (Register/Login/Logout)
- ✏️ **CRUD complet** des tâches
- 🏷️ Système de catégories
- 🎨 **Niveaux de priorité** (Basse, Moyenne, Haute)
- 📅 Dates d'échéance
- 🔍 Filtres (tâches terminées, en cours, par priorité)
- 📊 Dashboard avec statistiques en temps réel
- 🛡️ Architecture Clean avec Repository Pattern
- 📝 Documentation Swagger/OpenAPI

### 🎨 Frontend (Angular)
- 🖼️ Interface moderne et responsive (Angular Material)
- 🔐 Authentification avec Guards et Interceptors
- 📝 Formulaires réactifs avec validation
- 🔄 Mise à jour en temps réel avec RxJS
- 🎭 Animations fluides
- 🌓 Design professionnel avec Material Design
- 📱 Responsive (Mobile, Tablette, Desktop)

---

## 🛠️ Technologies Utilisées

### Backend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **ASP.NET Core** | 10.0 | Framework Web API |
| **Entity Framework Core** | 10.0 | ORM |
| **SQL Server Express** | 2022 | Base de données |
| **JWT** | 7.0 | Authentification |
| **BCrypt.Net** | 4.0 | Hachage des mots de passe |
| **Swagger** | 10.1 | Documentation API |

### Frontend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **Angular** | 19.0 | Framework SPA |
| **Angular Material** | 19.0 | Composants UI |
| **TypeScript** | 5.6 | Langage |
| **RxJS** | 7.8 | Programmation réactive |
| **SCSS** | - | Styles |

---

## 📂 Structure du Projet
TodoListPro/
│
├── 📁 TodoListPro.API/ # Backend .NET Core
│ ├── Controllers/
│ │ ├── AuthController.cs # Authentification
│ │ ├── TodosController.cs # Gestion des tâches
│ │ └── CategoriesController.cs # Gestion des catégories
│ ├── Program.cs # Configuration de l'application
│ └── appsettings.json # Configuration
│
├── 📁 TodoListPro.Core/ # Couche Domaine
│ ├── Entities/ # Modèles de données
│ ├── Interfaces/ # Contrats
│ └── DTOs/ # Data Transfer Objects
│
├── 📁 TodoListPro.Infrastructure/ # Couche Infrastructure
│ ├── Data/
│ │ └── AppDbContext.cs # Contexte EF Core
│ ├── Repositories/ # Implémentations Repository
│ ├── Services/ # Services métier
│ └── Migrations/ # Migrations de base de données
│
└── 📁 todo-app/ # Frontend Angular
├── src/app/
│ ├── core/ # Services singleton, Guards, Interceptors
│ ├── shared/ # Composants réutilisables
│ ├── features/ # Modules fonctionnels
│ │ ├── auth/ # Authentification
│ │ ├── dashboard/ # Tableau de bord
│ │ └── todos/ # Gestion des tâches
│ ├── layouts/ # Layouts (Header, Sidebar)
│ └── models/ # Interfaces TypeScript
└── src/environments/ # Configuration par environnement

text


---

## 🚀 Installation et Démarrage

### Prérequis
- ✅ **.NET 8 SDK** ou supérieur
- ✅ **Node.js** 18+ et npm
- ✅ **SQL Server Express** ou LocalDB
- ✅ **Visual Studio 2022** / VS Code / Rider (optionnel)
- ✅ **Git**

---

### 1️⃣ Cloner le Repository

```bash
git clone https://github.com/VOTRE_USERNAME/TodoListPro.git
cd TodoListPro
2️⃣ Configuration du Backend
A. Configurer la Base de Données
Modifie TodoListPro.API/appsettings.json :

JSON

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=TodoListProDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
B. Appliquer les Migrations
Bash

cd TodoListPro.API
dotnet ef database update --project ../TodoListPro.Infrastructure
C. Lancer l'API
Bash

dotnet run
L'API sera accessible sur : http://localhost:5124

Documentation Swagger : http://localhost:5124/swagger

3️⃣ Configuration du Frontend
A. Installer les Dépendances
Bash

cd todo-app
npm install
B. Configurer l'URL de l'API
Vérifie todo-app/src/environments/environment.ts :

TypeScript

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5124/api'
};
C. Lancer l'Application Angular
Bash

ng serve
L'application sera accessible sur : http://localhost:4200

📖 Utilisation
1. Inscription
Ouvre http://localhost:4200
Clique sur "S'inscrire"
Remplis le formulaire :
Nom d'utilisateur (min. 3 caractères)
Email valide
Mot de passe (min. 6 caractères)
2. Connexion
Entre ton email et mot de passe
Tu seras redirigé vers le Dashboard
3. Créer une Tâche
Clique sur "Nouvelle tâche"
Remplis :
Titre (obligatoire)
Description (optionnelle)
Priorité (Basse, Moyenne, Haute)
Catégorie (optionnelle)
Date d'échéance (optionnelle)
Clique sur "Créer"
4. Gérer les Tâches
✅ Cocher une tâche pour la marquer comme terminée
✏️ Cliquer sur "Modifier" pour éditer
🗑️ Cliquer sur "Supprimer" pour effacer
🔍 Utiliser la barre de recherche
🎯 Filtrer par statut (Toutes, En cours, Terminées)
🗄️ Modèle de Données
User
csharp

- Id (int)
- Username (string)
- Email (string)
- PasswordHash (string)
- CreatedAt (DateTime)
TodoItem
csharp

- Id (int)
- Title (string)
- Description (string?)
- IsCompleted (bool)
- Priority (enum: Low=1, Medium=2, High=3)
- CreatedAt (DateTime)
- DueDate (DateTime?)
- UserId (int)
- CategoryId (int?)
Category
csharp

- Id (int)
- Name (string)
- Color (string)
🔒 Sécurité
✅ Authentification JWT avec expiration
✅ Hachage des mots de passe avec BCrypt
✅ Protection CORS configurée
✅ Validation des données côté client et serveur
✅ Guards Angular pour protéger les routes
✅ Interceptors HTTP pour gérer les tokens
📊 API Endpoints
Authentication
text

POST   /api/Auth/register      # Inscription
POST   /api/Auth/login         # Connexion
Todos
text

GET    /api/Todos              # Liste des tâches
GET    /api/Todos/{id}         # Détail d'une tâche
GET    /api/Todos/pending      # Tâches en cours
GET    /api/Todos/completed    # Tâches terminées
POST   /api/Todos              # Créer une tâche
PUT    /api/Todos/{id}         # Modifier une tâche
DELETE /api/Todos/{id}         # Supprimer une tâche
PATCH  /api/Todos/{id}/toggle  # Basculer le statut
Categories
text

GET    /api/Categories         # Liste des catégories
GET    /api/Categories/{id}    # Détail d'une catégorie
POST   /api/Categories         # Créer une catégorie
DELETE /api/Categories/{id}    # Supprimer une catégorie
🧪 Tests
Tester l'API avec Swagger
Lance le backend
Ouvre http://localhost:5124/swagger
Clique sur "Authorize"
Inscris-toi via /api/Auth/register
Copie le token reçu
Entre Bearer {ton_token} dans Authorize
Teste tous les endpoints
📝 Roadmap / Améliorations Futures
 📊 Dashboard avec graphiques Chart.js
 🔔 Système de notifications
 📄 Export PDF des tâches
 🌓 Mode sombre
 ✅ Tests unitaires (xUnit + Jasmine)
 🚀 Déploiement sur Azure
 📱 Application mobile (Ionic)
 🤖 Suggestions de tâches par IA