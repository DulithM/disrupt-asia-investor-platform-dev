export interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Sample user data for demonstration
export const users: User[] = [
  {
    id: '1',
    email: 'user1@disruptasia.today',
    name: 'John Smith',
    role: 'investor'
    
  },
  {
    id: '2',
    email: 'user2@disruptasia.today',
    name: 'Sarah Chen',
    role: 'investor'
  },
  {
    id: '3',
    email: 'user3@disruptasia.today',
    name: 'Michael Johnson',
    role: 'investor'
  }
];

// Password mapping (in a real app, these would be hashed)
export const userPasswords: Record<string, string> = {
  'user1@disruptasia.today': 'password123',
  'user2@disruptasia.today': 'password123',
  'user3@disruptasia.today': 'password123'
};

// Authentication functions
export const authenticateUser = async (credentials: LoginCredentials): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = users.find(u => u.email === credentials.email);
  const correctPassword = userPasswords[credentials.email];
  
  if (user && correctPassword === credentials.password) {
    return user;
  }
  
  return null;
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getRoleDisplayName = (role: User['role']): string => {
  return 'Investor';
};
