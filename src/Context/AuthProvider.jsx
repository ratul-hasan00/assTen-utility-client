import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.init";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED MANUAL REGISTER (NOW RETURNS result.user CORRECTLY)
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);

    // 1. Create Firebase account
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // 2. Update name + photo
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL,
    });

    return result; // VERY IMPORTANT
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => signOut(auth);

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Update profile manually
  const updateUserProfile = async (profile) => {
    setLoading(true);
    await updateProfile(auth.currentUser, profile);
    setUser({ ...auth.currentUser, ...profile });
  };

  // Track logged-in user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    resetPassword,
    updateUserProfile,
    setLoading,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
