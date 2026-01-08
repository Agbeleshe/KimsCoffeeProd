"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthInitialized(true);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setAuthError("");
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError("Invalid email or password. Please check your credentials and try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return {
    authUser,
    authInitialized,
    isLoading,
    authError,
    handleSignIn,
    handleSignOut,
    setAuthError
  };
};