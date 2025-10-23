import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('scorecard_user');
    const savedSession = localStorage.getItem('scorecard_session');
    
    if (savedUser && savedSession) {
      const sessionData = JSON.parse(savedSession);
      const now = new Date().getTime();
      
      // Check if session is still valid (24 hours)
      if (now < sessionData.expires) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('scorecard_user');
        localStorage.removeItem('scorecard_session');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll use simple username/password validation
      // In production, this would call your authentication API
      const validUsers = [
        { id: '1', username: 'admin', password: 'admin123', email: 'admin@scorecard.com', role: 'admin' as const },
        { id: '2', username: 'user', password: 'user123', email: 'user@scorecard.com', role: 'user' as const },
        { id: '3', username: 'viewer', password: 'viewer123', email: 'viewer@scorecard.com', role: 'viewer' as const },
        { id: '4', username: 'demo', password: 'demo', email: 'demo@scorecard.com', role: 'user' as const },
      ];

      const foundUser = validUsers.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        // Save to localStorage with expiration (24 hours)
        const sessionData = {
          expires: new Date().getTime() + (24 * 60 * 60 * 1000)
        };
        
        localStorage.setItem('scorecard_user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('scorecard_session', JSON.stringify(sessionData));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('scorecard_user');
    localStorage.removeItem('scorecard_session');
  };

  const requireAuth = (): boolean => {
    return isAuthenticated;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    requireAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};