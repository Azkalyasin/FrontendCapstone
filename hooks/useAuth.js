// TODO: Custom hook untuk authentication
// Hook ini akan mengelola state authentication dan menyediakan fungsi login/logout

// import { useState, useEffect } from 'react';

export const useAuth = () => {
  // TODO: Implementasi useAuth hook
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   // Check if user is logged in
  //   // Fetch profile from API or localStorage
  // }, []);

  // return { user, loading, login, logout, isAuthenticated: !!user };
  
  return {
    user: null,
    loading: false,
    isAuthenticated: false,
  };
};
