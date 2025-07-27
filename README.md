# MealMate - Networking Through Food 🍽️

## Table of Contents

- [Quick Start](#quick-start-guide)
- [Project Introduction](#project-introduction)
- [Theme Relationship](#theme-relationship---networking-through-food)
- [Unique Features](#unique-features--highlights)
- [Advanced Features](#advanced-features-implemented)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#getting-started)
- [Configuration](#environment-configuration)
- [Docker Deployment](#docker-deployment)
- [Testing](#running-tests)
- [API Documentation](#api-documentation)
- [Demo Video](#live-demo-video)
- [Live Deployment](#live-deployment)

## Quick Start Guide

**Want to run MealMate immediately?** Jump to:

- 🚀 [Local Development Setup](#local-development-setup)
- 🐳 [Docker Quick Start](#docker-deployment)
- 📁 [Configuration Files](#configuration-files-setup)

## Project Introduction

Have you ever wanted to find friends to have lunch with? Or maybe you want to share food interests but cannot find people? In the first week of school, you have no friends but want to find someone to eat with? **MealMate can help you!**

MealMate is a social networking platform that connects university students and professionals through shared dining experiences. In a world where making genuine connections can be challenging, especially for new students or people in new cities, MealMate bridges the gap by using food as a universal connector.

The platform enables users to create meal events, discover dining partners with similar tastes, and build meaningful relationships through the universal language of food.

## Theme Relationship - Networking Through Food

**MealMate perfectly embodies this year's "Networking" theme through several key aspects:**

### 🤝 Social Connection Through Food

- Food is something everyone loves and shares - it's a natural conversation starter
- When you eat with someone, you naturally start talking and making friends
- The app transforms dining from a solitary activity into a social networking opportunity

### 🌟 Building Real Connections

- Helps users build genuine relationships, not just online friendships
- Perfect for new students looking for lunch buddies
- Ideal for working professionals wanting to expand their social circle
- Essential for people who just moved to a new city

### 🎯 Networking Made Natural

- Removes the awkwardness of traditional networking events
- Creates comfortable, low-pressure environments for meeting new people
- Uses shared food interests as the foundation for lasting relationships

The warm orange color scheme reinforces this networking theme - orange represents warmth, energy, and appetite, creating a welcoming atmosphere that encourages users to reach out and connect with others.

## Unique Features & Highlights

### 🎨 **Thoughtful Design Philosophy**

- **Orange Color Psychology**: Chosen specifically to evoke warmth, appetite, and social openness
- **Responsive UI**: Beautiful interface that works seamlessly on both desktop and mobile
- **Intuitive Navigation**: Clear user flow designed around social interaction patterns

### 🔄 **Real-time Social Features**

- **Live Chat System**: Instant messaging between meal partners using SignalR WebSockets
- **Dynamic Meal Discovery**: Real-time updates when new meals are posted
- **Social Notifications**: Get notified when someone joins your meal or sends a message

### 🔍 **Smart Discovery System**

- **Advanced Search & Filtering**: Find meals by cuisine type, dietary restrictions, location, and time
- **Tag-based Recommendations**: Discover new dining experiences based on your interests
- **Location-aware Matching**: Connect with people dining nearby

### 👥 **Community Building**

- **User Profiles**: Showcase your food preferences, dietary restrictions, and dining personality
- **Meal History**: Track your dining experiences and the connections you've made
- **Social Validation**: Build trust through user reviews and meal participation history

## Advanced Features Implemented

- ✅ **Theme Switching (Light/Dark Mode)** - Enhanced user experience with personalized visual preferences
- ✅ **Real-time Chat using WebSockets** - Live messaging system for meal coordination and social interaction
- ✅ **Dockerized Deployment** - Full containerization of both frontend and backend for consistent deployment
- ✅ **Unit Testing Components** - Comprehensive testing suite ensuring reliable functionality

## Technology Stack

### Backend (.NET 8)

- **Framework**: ASP.NET Core 8
- **Database**: Entity Framework Core with SQL Server (local) / SQLite (Docker)
- **Authentication**: JWT Bearer tokens for secure user sessions
- **Real-time Communication**: SignalR for WebSocket connections
- **API Documentation**: Swagger/OpenAPI for endpoint documentation

### Frontend (React + TypeScript)

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router for single-page application navigation
- **State Management**: React hooks and context
- **Build Tool**: Vite for fast development and optimized builds

### Development & Deployment

- **Containerization**: Docker for both frontend and backend
- **Version Control**: Git with regular commit history
- **Testing**: Jest and React Testing Library for unit tests
- **Development Environment**: Hot reloading for both frontend and backend

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for containerized deployment)
- [SQL Server LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb) (for local development)

### Configuration Files Setup

**⚠️ Important: Set up configuration files before running the application**

#### Backend Configuration

1. **Create `appsettings.json`** in the `backend/` directory:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "[Azure_SQL_Server_Link]"
  },
  "JwtSettings": {
    "Key": "[YOUR_JWT_SECRET_KEY_HERE]",
    "Issuer": "MealMate",
    "Audience": "MealMateUsers"
  },
  "dummyPassword": {
    "user1": "[HASHED_PASSWORD_1]",
    "user2": "[HASHED_PASSWORD_2]",
    "user3": "[HASHED_PASSWORD_3]",
    "user4": "[HASHED_PASSWORD_4]",
    "user5": "[HASHED_PASSWORD_5]",
    "user6": "[HASHED_PASSWORD_6]"
  }
}
```

⚠️ Security Note: Replace placeholders with actual values:

- Generate a strong JWT key (minimum 32 characters)
- Use properly hashed passwords for demo users
- Contact the developer for the actual configuration values needed for local development

#### Frontend Configuration

1. **Create `.env`** in the `frontend/` directory:

```env
VITE_API_URL= [API_URL]
```

### Local Development Setup

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Restore dependencies
dotnet restore

# Update database (creates MealMate database)
dotnet ef database update

# Run the application
dotnet run
```

The backend will be available at `http://localhost:5050`

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Docker Deployment

#### Prerequisites

- Docker Desktop installed and running
- Configuration files set up (see [Configuration Files Setup](#configuration-files-setup))
- Demo avatar images in backend/wwwroot/avatars/ directory
- **Alternative**: For local development without Docker, see [Local Development Setup](#local-development-setup)

#### Quick Start with Docker Compose

```bash
# Clone the repository
git clone [your-repo-url]
cd mealmate

# Ensure configuration files are in place
# (see Configuration Files Setup section above)

# Start all services
docker-compose up --build
```

**Access URLs:**

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5050`

#### Individual Container Deployment

**Backend Container:**

```bash
cd backend

# Ensure appsettings.json exists in backend directory
# Build Docker image
docker build -t mealmate-backend .

# Run container
docker run -p 5050:5050 mealmate-backend
```

**Frontend Container:**

```bash
cd frontend

# Ensure .env file exists in frontend directory
# Build Docker image
docker build -t mealmate-frontend .

# Run container
docker run -p 5173:5173 mealmate-frontend
```

#### Docker Environment Variables

The application automatically detects Docker environment via `DOTNET_RUNNING_IN_CONTAINER=true` and switches to:

- SQLite database instead of SQL Server
- Simplified CORS policy
- Disabled HTTPS redirection
- Container-optimized settings

### Running Tests

#### Backend Tests

```bash
cd backend
dotnet test
```

#### Frontend Tests

```bash
cd frontend
npm test
```

## Environment Configuration

### Development vs Production

Local vs Docker Environment
Local Development Environment

Backend: Uses Azure SQL server (configured in appsettings.json)
Frontend: Uses http://localhost:5050 for API calls (configured in .env)
HTTPS: Enabled with certificate validation
CORS: Restricted to localhost origins with credentials
Database: Persistent SQL Server database with seeded data

Docker Environment

Backend: Uses Azure SQL server for deployment (configured via AZURE_SQL_CONNECTION environment variable)
Frontend: Uses same configuration as local development
HTTPS: Disabled in containers for compatibility
CORS: Open for cross-origin requests
Database: Lightweight SQLite with automatic schema creation

Configuration File Locations
✅ Required Files:

```
backend/
└── appsettings.json          # Main configuration (REQUIRED)

frontend/
└── .env                      # Environment variables (REQUIRED)

```

⚠️ Security Notes:

- Configuration contains placeholder values for security
- Real JWT keys and hashed passwords should be kept private
- Contact the project maintainer for actual configuration values
- Never commit real connection strings or secrets to git
- The .env files should be gitignored (except .env.example)

## API Documentation

When running locally, visit `http://localhost:5050/swagger` for interactive API documentation.

### Key Endpoints

- `GET /api/meals` - Retrieve available meals
- `POST /api/meals` - Create new meal event
- `GET /api/users/profile` - Get user profile
- `POST /api/auth/login` - User authentication
- `/chathub` - WebSocket endpoint for real-time chat

## Project Structure

```
mealmate/
├── backend/
│   ├── Controllers/          # API Controllers
│   ├── Models/              # Data models
│   ├── Data/                # Database context and seeding
│   ├── Repository/          # Data access layer
│   ├── Services/            # Business logic
│   ├── Hubs/                # SignalR hubs for real-time features
│   ├── wwwroot/             # Static files directory
│   │   └── avatars/         # User avatar images
│   ├── Dockerfile           # Backend containerization
│   └── Program.cs           # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   └── styles/          # Styling files
│   ├── tests/               # Unit tests
│   ├── Dockerfile           # Frontend containerization
│   └── package.json         # Dependencies
├── docker-compose.yml       # Multi-container setup
└── README.md               # This file
```

## Live Demo Video

🎥 **[Demo Video Link]** - _5-minute walkthrough showcasing all features and advanced requirements_

The video demonstrates:

- Application overview and networking theme explanation
- Theme switching functionality
- Real-time chat system in action
- Docker containerization demonstration
- All basic and advanced requirements

## Live Deployment

🌐 **Frontend**: [Your Frontend Deployment URL]

🔗 **Backend API**: [Your Backend Deployment URL]

## Future Development

This project successfully implements all core requirements and advanced features for the MSA 2025 Phase 2 assessment. The current implementation provides a solid foundation with clean architecture, making it ready for future enhancements and scalability.

### Potential Enhancements

The modular design opens opportunities for exciting new features:

- 📨 Invite System — Allow users to invite friends directly to meals via email or in-app notifications
- 🔔 Enhanced Notifications — Push notifications for meal updates, chat messages, and friend requests
- 🗺️ Location Services — Google Maps integration for restaurant discovery and meeting point visualization
- 🎯 Smart Matching — AI-powered recommendations based on user preferences and dining history
- 🎫 Event Management — Support for larger group meals, recurring dining events, and special occasions
- 🌐 Multi-language Support — Internationalization for diverse university communities
  Technical Roadmap

## License

© 2025 MealMate. Built for MSA Phase 2 Assessment. All rights reserved.

---

_Connecting university students through shared meals and experiences - because every great friendship starts with good food! 🍕🤝_
