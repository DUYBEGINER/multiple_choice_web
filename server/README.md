# Clean Architecture Backend with Prisma

This is a professionally structured Node.js backend using **Prisma ORM**, **Express**, and **SQL Server** following **Clean Architecture** and **Separation of Concerns** principles.

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/      # HTTP request/response handlers
│   ├── services/         # Business logic layer
│   ├── repositories/     # Database access layer (Prisma)
│   ├── middleware/       # Express middleware
│   ├── routes/           # API route definitions
│   ├── utils/            # Utility functions
│   └── lib/              # Prisma client singleton
├── prisma/
│   └── schema.prisma     # Database schema
├── app.js                # Express app configuration
├── server.js             # Server entry point
└── .env                  # Environment variables
```

## 🏗️ Architecture Layers

### 1. **Controller Layer** (`src/controllers/`)
- Handles HTTP requests and responses
- Validates request data
- Calls service layer
- Returns formatted responses

### 2. **Service Layer** (`src/services/`)
- Contains business logic
- Orchestrates operations
- Calls repository layer
- Handles complex workflows

### 3. **Repository Layer** (`src/repositories/`)
- Direct database interactions via Prisma
- CRUD operations
- Database-specific logic
- Query optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- SQL Server
- npm or yarn

### Installation

```bash
# Install dependencies
cd server
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations (if needed)
npx prisma migrate dev

# Start development server
npm run dev
```

## 📖 API Endpoints

### User Endpoints

#### Get All Users (with pagination)
```http
GET /api/users?page=1&limit=10&status=active&search=john
```

**Response:**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Get User by ID
```http
GET /api/users/:uid
```

**Response:**
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "uid": "abc123",
    "email": "user@example.com",
    "displayName": "John Doe",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "uid": "firebase-uid-123",
  "email": "newuser@example.com",
  "displayName": "New User"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { ... }
}
```

#### Update User
```http
PUT /api/users/:uid
Content-Type: application/json

{
  "displayName": "Updated Name",
  "status": "active"
}
```

#### Delete User (Soft Delete)
```http
DELETE /api/users/:uid
```

#### Delete User (Hard Delete)
```http
DELETE /api/users/:uid?hard=true
```

#### Get User Statistics
```http
GET /api/users/stats
```

**Response:**
```json
{
  "success": true,
  "message": "User stats fetched successfully",
  "data": {
    "activeUsers": 45,
    "totalUsers": 50,
    "inactiveUsers": 5
  }
}
```

#### Get User by Email
```http
GET /api/users/email/:email
```

## 🔧 How the Layers Connect

### Example: Creating a User

1. **Client Request**
```javascript
POST /api/users
{
  "uid": "firebase-123",
  "email": "user@example.com",
  "displayName": "John Doe"
}
```

2. **Route** (`src/routes/user.routes.js`)
```javascript
router.post('/', asyncHandler(userController.createUser.bind(userController)));
```

3. **Controller** (`src/controllers/user.controller.js`)
```javascript
async createUser(req, res, next) {
  const userData = req.body;
  const user = await userService.createUser(userData);
  return ApiResponse.created(res, user, 'User created successfully');
}
```

4. **Service** (`src/services/user.service.js`)
```javascript
async createUser(userData) {
  // Validate
  if (!userData.uid || !userData.email) {
    throw new BadRequestError('UID and email required');
  }
  
  // Check duplicates
  const existing = await userRepository.findByEmail(userData.email);
  if (existing) {
    throw new ConflictError('Email already exists');
  }
  
  // Create user
  return await userRepository.createUser(userData);
}
```

5. **Repository** (`src/repositories/user.repository.js`)
```javascript
async createUser(userData) {
  return await this.model.create({
    data: {
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      status: 'active'
    }
  });
}
```

6. **Prisma Client** (`src/lib/prisma.js`)
```javascript
// Singleton instance managing database connection
const prisma = new PrismaClient();
```

## 🛡️ Error Handling

All errors are handled centrally by the error handler middleware:

```javascript
// Custom errors
throw new NotFoundError('User not found');
throw new ConflictError('Email already exists');
throw new BadRequestError('Invalid input');

// Prisma errors are automatically converted
// P2002 -> ConflictError (unique constraint)
// P2025 -> NotFoundError (record not found)
```

**Error Response Format:**
```json
{
  "success": false,
  "message": "User not found",
  "errors": null
}
```

## 📝 Adding a New Feature

To add a new feature (e.g., Quiz):

1. **Update Prisma Schema**
```prisma
model quizzes {
  id        String   @id @default(uuid())
  title     String
  createdBy String
  createdAt DateTime @default(now())
  user      users    @relation(fields: [createdBy], references: [uid])
}
```

2. **Generate Prisma Client**
```bash
npx prisma generate
```

3. **Create Repository** (`src/repositories/quiz.repository.js`)
```javascript
import { prisma } from '../lib/prisma.js';
import { BaseRepository } from './base.repository.js';

class QuizRepository extends BaseRepository {
  constructor() {
    super(prisma.quizzes);
  }
  
  async findByUser(userId) {
    return await this.model.findMany({
      where: { createdBy: userId }
    });
  }
}

export const quizRepository = new QuizRepository();
```

4. **Create Service** (`src/services/quiz.service.js`)
```javascript
import quizRepository from '../repositories/quiz.repository.js';

class QuizService {
  async createQuiz(quizData) {
    // Business logic here
    return await quizRepository.create(quizData);
  }
}

export const quizService = new QuizService();
```

5. **Create Controller** (`src/controllers/quiz.controller.js`)
```javascript
import quizService from '../services/quiz.service.js';

class QuizController {
  async createQuiz(req, res, next) {
    try {
      const quiz = await quizService.createQuiz(req.body);
      return ApiResponse.created(res, quiz);
    } catch (error) {
      next(error);
    }
  }
}

export const quizController = new QuizController();
```

6. **Create Routes** (`src/routes/quiz.routes.js`)
```javascript
import express from 'express';
import quizController from '../controllers/quiz.controller.js';

const router = express.Router();

router.post('/', asyncHandler(quizController.createQuiz.bind(quizController)));

export default router;
```

7. **Mount Routes** (in `src/routes/index.js`)
```javascript
import quizRoutes from './quiz.routes.js';
router.use('/quizzes', quizRoutes);
```

## 🎯 Best Practices

1. **Always use async/await** with try-catch or asyncHandler
2. **Use custom error classes** for consistent error handling
3. **Validate input** in service layer, not controller
4. **Keep controllers thin** - only handle HTTP
5. **Keep services focused** - single responsibility
6. **Use repositories** for all database operations
7. **Log important operations** using the logger utility
8. **Use transactions** for operations affecting multiple tables

## 🔐 Environment Variables

```env
DATABASE_URL="sqlserver://localhost:1433;database=QuizData;user=SA;password=xxx;encrypt=true;trustServerCertificate=true"
PORT=3000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Dependencies

- **express** - Web framework
- **@prisma/client** - Prisma ORM
- **cors** - CORS middleware
- **cookie-parser** - Cookie parsing
- **dotenv** - Environment variables

## 🤝 Contributing

Follow the established architecture when adding new features. Keep the separation of concerns intact.

---

**Built with ❤️ using Clean Architecture principles**
