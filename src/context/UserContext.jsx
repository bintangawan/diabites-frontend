import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('diabites_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Auto-save ke localStorage tiap ada perubahan
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('diabites_user', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);