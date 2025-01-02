'use client';
import app from '@/firebase/firebase.config';
import { Children, createContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

export const ContextProvider = createContext();
export const auth = getAuth(app);
const Context = ({ children }) => {
  const [user, setUser] = useState('');
  const Signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribed();
    };
  });

  const info = { Signup, Login, user, setUser };
  return (
    <ContextProvider.Provider value={info}>{children}</ContextProvider.Provider>
  );
};

export default Context;
