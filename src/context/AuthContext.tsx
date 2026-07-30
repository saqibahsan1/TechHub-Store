import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthAPI from '@/lib/api/auth';

// Define types
interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Admin';
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await AuthAPI.getProfile();
          setUser(response.data);
          setToken(token);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    const response = await AuthAPI.login({ email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    setUser(response.data);
    setToken(response.data.token);
    router.push('/');
  };

  // Register
  const register = async (name: string, email: string, password: string) => {
    const response = await AuthAPI.register({ name, email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    setUser(response.data);
    setToken(response.data.token);
    router.push('/');
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  // Update profile
  const updateProfile = async (userData: Partial<User>) => {
    const response = await AuthAPI.updateProfile(userData);
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};