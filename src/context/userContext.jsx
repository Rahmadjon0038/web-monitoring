'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

// Context yaratish
const RoleContext = createContext();

// Provider yaratish
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Cookiesdan 'role'ni olish (agar mavjud bo‘lsa)
    const cookies = document.cookie;
    const roleCookie = cookies.split(';').find(c => c.trim().startsWith('role='));
    if (roleCookie) {
      const roleValue = roleCookie.split('=')[1];
      setRole(roleValue);
    }
  }, []);

  // Context qiymatini taqdim etish
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// useContext hook yordamida role ni olish
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
