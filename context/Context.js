'use client';
import app from '@/firebase/firebase';
import { Children, createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const ContextProvider = createContext();
const Context = ({ children }) => {
  const auth = getAuth(app);
  const Signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const info = { Signup };
  return (
    <ContextProvider.Provider value={info}>{children}</ContextProvider.Provider>
  );
};

export default Context;
