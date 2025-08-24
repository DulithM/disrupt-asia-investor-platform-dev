# Disrupt Asia 2025 - Login System

## Overview

This project now includes a comprehensive authentication system with user management, role-based access control, and a beautiful login interface.

## Features

### 🔐 Authentication System
- **User Login**: Secure login with email and password
- **Session Management**: Persistent sessions using localStorage
- **Role-Based Access**: Different user roles (investor, startup, admin, speaker)
- **Protected Routes**: Automatic redirection for unauthenticated users

### 👥 User Management
- **User Profiles**: Detailed user information and editing capabilities
- **Role Display**: Visual indicators for different user types
- **Profile Updates**: In-place editing of user information

### 🎨 User Interface
- **Modern Login Page**: Beautiful gradient design with form validation
- **Responsive Design**: Works on desktop and mobile devices
- **Demo Accounts**: Pre-configured test accounts for easy testing
- **Loading States**: Smooth loading indicators during authentication

## Demo Accounts

The system includes several demo accounts for testing:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `investor@example.com` | `investor123` | Investor | Venture capitalist |
| `startup@example.com` | `startup123` | Startup | Tech startup founder |
| `admin@disruptasia.com` | `admin123` | Admin | Platform administrator |
| `speaker@example.com` | `speaker123` | Speaker | Conference speaker |

## File Structure

```
├── app/
│   ├── login/
│   │   └── page.tsx              # Login page component
│   ├── profile/
│   │   └── page.tsx              # User profile page
│   └── landing/
│       └── page.tsx              # Landing page
├── components/
│   ├── auth/
│   │   └── protected-route.tsx   # Route protection component
│   └── header.tsx                # Updated header with user menu
├── hooks/
│   └── use-auth.tsx              # Authentication context hook
└── data/
    └── login-details.ts          # User data and authentication logic
```

## Key Components

### Authentication Hook (`use-auth.tsx`)
- Manages authentication state across the application
- Provides login, logout, and user update functions
- Handles session persistence with localStorage

### Protected Route (`protected-route.tsx`)
- Wraps components that require authentication
- Automatically redirects unauthenticated users to login
- Supports role-based access control

### Login Page (`app/login/page.tsx`)
- Modern, responsive login form
- Form validation using Zod and React Hook Form
- Demo account display for easy testing
- Error handling and loading states

### User Profile (`app/profile/page.tsx`)
- Displays user information
- Allows editing of profile details
- Shows account status and role information

## Usage

### Protecting a Route
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div>This content requires authentication</div>
    </ProtectedRoute>
  );
}
```

### Using Authentication in Components
```tsx
import { useAuth } from '@/hooks/use-auth';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use authentication state and functions
}
```

### Role-Based Protection
```tsx
<ProtectedRoute requiredRole="investor">
  <div>Only investors can see this</div>
</ProtectedRoute>
```

## Security Notes

⚠️ **Important**: This is a demonstration system with the following considerations:

1. **Passwords are stored in plain text** - In production, use proper password hashing
2. **Authentication is client-side** - In production, implement server-side authentication
3. **No HTTPS enforcement** - Always use HTTPS in production
4. **No rate limiting** - Implement rate limiting for login attempts
5. **No password complexity requirements** - Add proper password validation

## Production Recommendations

1. **Backend API**: Implement a proper backend with JWT or session-based authentication
2. **Password Security**: Use bcrypt or similar for password hashing
3. **HTTPS**: Enforce HTTPS for all authentication requests
4. **Rate Limiting**: Implement rate limiting on login endpoints
5. **Email Verification**: Add email verification for new accounts
6. **Password Reset**: Implement password reset functionality
7. **Audit Logging**: Log authentication events for security monitoring

## Getting Started

1. **Install Dependencies**: `npm install` or `pnpm install`
2. **Run Development Server**: `npm run dev` or `pnpm dev`
3. **Access Login Page**: Navigate to `/login`
4. **Test with Demo Accounts**: Use the provided demo credentials

The system is now ready to use! Users will be automatically redirected to the login page when accessing protected routes, and authenticated users will see their profile information in the header.
