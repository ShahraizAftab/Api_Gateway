# API Gateway Backend

A Node.js Express API Gateway with authentication, caching, and external API integration.

## Features

- **Authentication System**: User registration, login, and JWT-based authentication
- **API Gateway**: Routes and manages external API calls
- **Caching**: Redis-based caching for improved performance
- **Rate Limiting**: Request rate limiting middleware
- **Logging**: Request logging middleware
- **Database**: MongoDB integration with Mongoose
- **Security**: Password hashing with bcryptjs
- **CORS**: Cross-origin resource sharing enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Cache**: Redis
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **HTTP Client**: Axios
- **Environment**: dotenv

## Project Structure

```
backend/
├── config/
│   ├── dbconnect.js      # MongoDB connection
│   └── redis.js          # Redis connection
├── controller/
│   ├── authController.js  # Authentication logic
│   └── newsController.js  # News API logic
├── middlewares/
│   ├── authMiddleware.js     # JWT authentication
│   ├── cacheMiddleware.js    # Redis caching
│   ├── loggerMiddleware.js   # Request logging
│   └── rateLimitMiddleware.js # Rate limiting
├── models/
│   ├── logSchema.js      # Log data schema
│   └── user.js          # User data schema
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   └── dataRoutes.js     # Data API routes
├── Dockerfile           # Docker configuration
├── index.js            # Main server file
└── package.json        # Dependencies
```

## API Endpoints

### Authentication Routes (`/auth`)

- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)
- `PATCH /plan` - Update user plan (protected)

### Data Routes (`/api/v1`)

- `GET /news` - Fetch news data (protected, rate limited, cached)

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=port
# MONGO_URI=mongo_uri
JWT_SECRET=key
REDIS_URL=redis url
```

## Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:

```bash
npm run dev
```

## Docker Setup

The backend is configured to run with Docker Compose:

```bash
# From the project root
docker-compose up backend
```

## Dependencies

### Production Dependencies

- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `redis` - Redis client
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin resource sharing
- `axios` - HTTP client
- `dotenv` - Environment variable management

### Development Dependencies

- `nodemon` - Development server with auto-restart

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Database Models

### User Model

- `name` - User's full name
- `username` - Unique username
- `email` - User's email address
- `password` - Hashed password
- `plan` - User subscription plan (free/pro)

### Log Model

- `method` - HTTP method
- `url` - Request URL
- `timestamp` - Request timestamp
- `userAgent` - Client user agent
- `ip` - Client IP address

## Middleware

- **Authentication**: Validates JWT tokens
- **Rate Limiting**: Prevents API abuse
- **Caching**: Redis-based response caching
- **Logging**: Request logging and monitoring

## External APIs

- **News API**: Fetches news headlines from newsapi.org
- Cached for 60 seconds to improve performance

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Rate limiting to prevent abuse
- CORS configuration
- Input validation and sanitization
