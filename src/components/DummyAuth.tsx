
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy accounts dengan role yang lebih jelas
const DUMMY_ACCOUNTS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Administrator'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    role: 'user' as const,
    name: 'Regular User'
  }
];

export const DummyAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('dummy-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const account = DUMMY_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      const user = {
        id: account.id,
        email: account.email,
        role: account.role,
        name: account.name
      };
      setUser(user);
      localStorage.setItem('dummy-user', JSON.stringify(user));
      console.log('User logged in:', user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dummy-user');
    console.log('User logged out');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useDummyAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useDummyAuth must be used within a DummyAuthProvider');
  }
  return context;
};
