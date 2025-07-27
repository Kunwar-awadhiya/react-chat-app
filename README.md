# React SPA Assessment

A modern Single Page Application built with React.js featuring authentication, real-time chat, infinite scroll, and dark/light theme support.

## 🚀 Live Demo

- **Live App**: https://react-chat-app-0edj.onrender.com/login
- **GitHub Repository**: https://github.com/Kunwar-awadhiya/react-chat-app

## ✨ Features

- ✅ **Authentication**: Token-based auth with auto-login support
- ✅ **Real-time Chat**: WebSocket integration with echo server
- ✅ **Infinite Scroll**: RTK Query + Intersection Observer
- ✅ **Dark/Light Theme**: React Context with persistent storage
- ✅ **Protected Routes**: Route-based authentication guards
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Form Validation**: Comprehensive client-side validation
- ✅ **Error Handling**: Loading states and error boundaries
- ✅ **Modern Architecture**: Redux Toolkit, RTK Query, React Router v7

## 🛠️ Tech Stack

- **Framework**: React 18 (Functional Components + Hooks)
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **WebSocket**: Native WebSocket API

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone [your-repo-url]
cd react-spa-assessment

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report

# Linting
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat functionality
│   ├── common/         # Shared components
│   ├── feed/           # Feed-related components
│   ├── layout/         # Layout components
│   └── navigation/     # Navigation components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
├── store/              # Redux store configuration
│   ├── api/            # RTK Query API slices
│   └── slices/         # Redux slices
├── utils/              # Utility functions
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## 🔐 Authentication

The app uses DummyJSON API for authentication:

**Demo Credentials:**
- Username: `kminchelle`
- Password: `0lelplR`

**Features:**
- Token-based authentication (access + refresh tokens)
- Automatic token storage and retrieval
- Protected route navigation
- Auto-login on app reload
- Secure logout with token cleanup

## 💬 Real-time Chat

- **WebSocket Server**: `wss://echo.websocket.org`
- **Features**:
  - Real-time message sending/receiving
  - Connection status indicators
  - Auto-reconnection with exponential backoff
  - Message history persistence
  - Typing indicators
  - Mobile-responsive sidebar

## 🎨 Theming

- **Light/Dark Mode**: Toggle between themes
- **Persistent Storage**: Theme preference saved to localStorage
- **System Detection**: Respects user's system theme preference
- **Smooth Transitions**: Animated theme switching

## 📱 Responsive Design

- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Responsive across all screen sizes
- **Touch-Friendly**: Optimized for touch interactions
- **Accessible**: WCAG 2.1 AA compliant

## 🧪 Testing

The project includes comprehensive tests using Vitest and React Testing Library:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- Component rendering tests
- User interaction tests
- Form validation tests
- Authentication flow tests
- Theme switching tests

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to configure your deployment
```

### Netlify Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
# Or connect your GitHub repository to Netlify for automatic deployments
```

### Environment Variables

No environment variables required for this demo application.

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configuration:
- Dark mode support
- Custom color palette
- Responsive breakpoints
- Custom animations

### Vite Configuration

- React plugin enabled
- Development server on port 3000
- Source maps in production
- Testing configuration with Vitest

## 📝 API Integration

### Authentication API
- **Base URL**: `https://dummyjson.com/docs/auth`
- **Endpoints**:
  - `POST /auth/login` - User login
  - `POST /auth/refresh` - Token refresh
  - `GET /auth/me` - Get current user

### Content API
- **Products**: `GET /products` - Product listings
- **Users**: `GET /users` - User profiles

## 🏆 Performance Optimizations

- **Code Splitting**: Lazy loading of routes
- **Image Optimization**: Lazy loading with proper alt tags
- **Bundle Size**: Tree shaking with Vite
- **Caching**: RTK Query automatic caching
- **Memoization**: React.memo and useCallback optimization

## 🔒 Security Considerations

- **Token Storage**: Secure localStorage implementation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based authentication
- **Input Validation**: Client and server-side validation

## 🐛 Known Issues & Limitations

- **Refresh Token**: DummyJSON doesn't provide separate refresh tokens
- **WebSocket Reconnection**: Limited to 5 attempts
- **Image Loading**: No fallback for broken images
- **Offline Support**: Not implemented in this version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DummyJSON**: For providing the mock API
- **Echo WebSocket**: For the real-time testing server
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide React**: For the beautiful icons

## 📞 Support

For support, email kunwarawadhiya@gmail.com or create an issue in the GitHub repository.

---

**Developer**: kunwar Awadhiya
