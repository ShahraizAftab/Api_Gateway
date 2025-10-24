# API Gateway Frontend

A React-based frontend application for the API Gateway with authentication and data visualization.

## Features

- **Authentication**: User login and registration
- **Dashboard**: Main application dashboard
- **News Display**: Real-time news fetching and display
- **Crypto Data**: Cryptocurrency data visualization
- **Responsive Design**: Mobile-friendly interface
- **Routing**: React Router for navigation
- **State Management**: React hooks for state management

## Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.4
- **HTTP Client**: Axios 1.12.2
- **Styling**: CSS3
- **Linting**: ESLint 9.36.0

## Project Structure

```
frontend/
├── public/
│   └── vite.svg          # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg     # React logo
│   ├── components/
│   │   └── DataDisplay.jsx # Reusable data display component
│   ├── pages/
│   │   ├── Login.jsx     # Login page
│   │   ├── Signup.jsx    # Registration page
│   │   ├── NewPage.jsx   # Dashboard page
│   │   ├── NewsPage.jsx  # News display page
│   │   └── CryptoPage.jsx # Crypto data page
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

## Pages

### Authentication

- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration

### Main Application

- **Dashboard** (`/newpage`) - Main application dashboard
- **News** (`/news`) - News articles display
- **Crypto** (`/crypto`) - Cryptocurrency data

## Components

### DataDisplay

A reusable component for displaying data with:

- Loading states
- Error handling
- Empty state messages
- Custom rendering functions

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend communicates with the backend API at `http://localhost:5010`:

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Data Endpoints

- `GET /api/v1/news` - Fetch news data (requires authentication)

## Authentication Flow

1. User logs in through the Login page
2. JWT token is stored in localStorage
3. Token is included in API requests via Authorization header
4. Protected routes require valid authentication

## Development

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
