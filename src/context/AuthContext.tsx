'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Role = 'guest' | 'patient' | 'doctor' | 'admin';

interface AuthContextType {
  role: Role;
  login: (selectedRole: Role) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('guest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from local storage
    const storedRole = localStorage.getItem('mockRole') as Role;
    if (storedRole) setRole(storedRole);
    setTimeout(() => setIsLoading(false), 500); // skeleton sim
  }, []);

  const login = (selectedRole: Role) => {
    setRole(selectedRole);
    localStorage.setItem('mockRole', selectedRole);
  };

  const logout = () => {
    setRole('guest');
    localStorage.removeItem('mockRole');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
