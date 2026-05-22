"use client";
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  const [formSubmissionTimes, setFormSubmissionTimes] = useState([]);
  const [isPermanentlyBlocked, setIsPermanentlyBlocked] = useState(false);

  const incrementFormSubmissions = () => {
    const now = Date.now();
    const timeWindow = 60 * 1000;
    
    const activeSubmissions = formSubmissionTimes.filter(time => now - time < timeWindow);
    
    if (activeSubmissions.length >= 3) {
      const secondsLeft = Math.ceil((timeWindow - (now - activeSubmissions[0])) / 1000);
      if (activeSubmissions.length >= 5) {
        setIsPermanentlyBlocked(true);
      }
      return { allowed: false, secondsLeft };
    }

    const updatedSubmissions = [...activeSubmissions, now];
    setFormSubmissionTimes(updatedSubmissions);
    
    return { allowed: true };
  };

  return (
    <AppContext.Provider value={{ 
      selectedIdentity, 
      setSelectedIdentity,
      incrementFormSubmissions,
      isPermanentlyBlocked,
      setIsPermanentlyBlocked
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
