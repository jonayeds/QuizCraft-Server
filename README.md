# QuizCraft Server 🎯

A powerful TypeScript Express.js backend API for the QuizCraft platform - an intelligent quiz creation and management system with AI-powered question generation.

## 🚀 Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Cookie-based session handling** for enhanced security
- **User registration and login** with bcrypt password hashing
- **Role-based access control** (Admin/User permissions)

### 🧠 AI-Powered Quiz Generation
- **Groq AI integration** for intelligent question generation
- **Topic-based question creation** with customizable difficulty levels
- **Automatic answer validation** and scoring systems
- **Dynamic quiz content** generation based on user preferences

### 📊 Quiz Management
- **Create, read, update, delete quizzes** with full CRUD operations
- **Joining code system** for easy quiz participation
- **Real-time quiz participation** tracking
- **Automatic scoring and leaderboard** generation
- **Quiz analytics** and performance insights

### 👥 User Management
- **User profiles** with customizable information
- **Quiz history tracking** for created and participated quizzes
- **Performance analytics** and progress tracking
- **Admin dashboard** capabilities

### 🏷️ Topic Management
- **Dynamic topic categories** for organized quiz creation
- **Topic-based filtering** and search functionality
- **Admin controls** for topic management

### 📈 Participation System
- **Real-time participation tracking** with completion status
- **Score calculation** and ranking systems
- **Detailed answer analytics** and review capabilities
- **Export functionality** for quiz results

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe JavaScript development
- **MongoDB** - NoSQL database with Mongoose ODM
- **Groq SDK** - AI-powered question generation
- **JWT** - Secure authentication tokens
- **Bcrypt** - Password hashing and security
- **Zod** - Schema validation and type safety
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - HTTP cookie parsing

## 📁 Project Structure

```
quizcraft-server/
├── src/
│   ├── app/
│   │   ├── config/           # Configuration settings
│   │   ├── errors/           # Error handling utilities
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── middlewares/      # Express middlewares
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── globalErrorHandler.ts
│   │   │   ├── notFound.ts
│   │   │   └── validateRequest.ts
│   │   ├── modules/          # Feature modules
│   │   │   ├── auth/         # Authentication logic
│   │   │   ├── participator/ # Quiz participation
│   │   │   ├── question/     # Question management
│   │   │   ├── quiz/         # Quiz operations
│   │   │   ├── topic/        # Topic management
│   │   │   └── user/         # User management
│   │   ├── routes/           # API route definitions
│   │   └── utils/            # Utility functions
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
├── dist/                    # Compiled JavaScript output
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jonayeds/QuizCraft-Server.git
   cd QuizCraft-Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/QuizCraft?retryWrites=true&w=majority
   
   # Server Configuration
   PORT=8000
   NODE_ENV=development
   
   # Authentication
   JWT_ACCESS_SECRET=your-super-secret-jwt-key-here
   SALT_ROUNDS=12
   DEFAULD_PASSWORD=your-default-admin-password
   
   # AI Integration
   GROQ_API_KEY=your-groq-api-key-here
   ```

4. **Set up MongoDB:**
   
   **Option A: MongoDB Atlas (Recommended)**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get connection string and update `DATABASE_URI` in `.env`
   
   **Option B: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - Update `DATABASE_URI` to `mongodb://localhost:27017/QuizCraft`

5. **Get Groq API Key:**
   - Visit [Groq Console](https://console.groq.com/)
   - Create an account and generate an API key
   - Add the key to `GROQ_API_KEY` in your `.env` file

### 🏃‍♂️ Running the Application

**Development mode with auto-reload:**
```bash
npm run dev
# or
yarn dev
```

**Production build:**
```bash
# Build the project
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

The server will start on `http://localhost:8000` by default.

## 📡 API Endpoints

### 🔐 Authentication Routes
```
POST   /api/v1/auth/login           # User login
POST   /api/v1/auth/logout          # User logout
POST   /api/v1/auth/refresh         # Refresh JWT token
```

### 👥 User Routes
```
POST   /api/v1/user/register        # User registration
GET    /api/v1/user/profile         # Get user profile
PUT    /api/v1/user/profile         # Update user profile
GET    /api/v1/user/:id             # Get user by ID
```

### 🎯 Quiz Routes
```
POST   /api/v1/quiz/create          # Create new quiz
GET    /api/v1/quiz/my-created      # Get user's created quizzes
GET    /api/v1/quiz/my-joined       # Get user's joined quizzes
GET    /api/v1/quiz/:id             # Get quiz by ID
PUT    /api/v1/quiz/:id             # Update quiz
DELETE /api/v1/quiz/:id             # Delete quiz
POST   /api/v1/quiz/join            # Join quiz with code
POST   /api/v1/quiz/:id/submit      # Submit quiz answers
GET    /api/v1/quiz/:id/participants # Get quiz participants
```

### ❓ Question Routes
```
GET    /api/v1/question/quiz/:id    # Get questions for quiz
POST   /api/v1/question/generate    # Generate AI questions
PUT    /api/v1/question/:id         # Update question
DELETE /api/v1/question/:id         # Delete question
```

### 🏷️ Topic Routes
```
GET    /api/v1/topic               # Get all topics
POST   /api/v1/topic/create-topic   # Create new topic (Admin)
PUT    /api/v1/topic/:id           # Update topic (Admin)
DELETE /api/v1/topic/:id           # Delete topic (Admin)
```

## 🧪 Testing the API

**Using curl:**
```bash
# Register a new user
curl -X POST http://localhost:8000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Using Postman:**
1. Import the API collection (if available)
2. Set base URL to `http://localhost:8000/api/v1`
3. Add authentication tokens to headers as needed

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URI` | MongoDB connection string | ✅ Yes | - |
| `PORT` | Server port number | ❌ No | 8000 |
| `NODE_ENV` | Environment mode | ❌ No | development |
| `JWT_ACCESS_SECRET` | JWT signing secret | ✅ Yes | - |
| `SALT_ROUNDS` | Bcrypt salt rounds | ❌ No | 12 |
| `GROQ_API_KEY` | Groq AI API key | ✅ Yes | - |
| `DEFAULD_PASSWORD` | Default admin password | ❌ No | - |

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add all environment variables from your `.env` file

### Railway Deployment

1. **Connect your GitHub repository**
2. **Add environment variables**
3. **Deploy automatically on push**

### Heroku Deployment

1. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set DATABASE_URI=your-mongodb-uri
   heroku config:set JWT_ACCESS_SECRET=your-secret
   # ... add other variables
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq AI** for powerful question generation
- **MongoDB** for reliable data storage
- **Express.js** community for excellent documentation
- **TypeScript** team for type safety

## 📧 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Coding! 🎉**
## An Ai Quiz Generation and participation Web Application

## Live Link
<a href="https://quizcraft-client.vercel.app/">Demo</a>

## Getting Started

First, run the development server:

```bash
npm install
```

```bash
npm run dev
```


Open [http://localhost:8000/api/v1](http://localhost:8000/api/v1) with your browser to see the result.

