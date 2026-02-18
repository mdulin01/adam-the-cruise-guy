import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase-config';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { allowedEmails } from './constants';
import LandingPage from './components/LandingPage';
import CRMApp from './components/CRMApp';
import './index.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showPortal, setShowPortal] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && allowedEmails.includes(u.email?.toLowerCase())) {
        setUser(u);
        setShowPortal(true);
      } else {
        setUser(null);
        if (u) signOut(auth);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const handleSignIn = async () => {
    try {
      setAuthError('');
      const result = await signInWithPopup(auth, googleProvider);
      if (!allowedEmails.includes(result.user.email?.toLowerCase())) {
        await signOut(auth);
        setAuthError('Access denied. Your account is not authorized.');
      }
    } catch (e) {
      setAuthError('Sign-in failed: ' + e.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setShowPortal(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user && showPortal) {
    return <CRMApp user={user} onSignOut={handleSignOut} />;
  }

  return (
    <LandingPage
      onSignIn={handleSignIn}
      authError={authError}
    />
  );
}
