import { auth, gooogleProvider } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';
import './Auth.css';
import GoogleButton from 'react-google-button';

export const Auth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<string>('');

  //using firebase authentification to create a user
  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  //Sign in with google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, gooogleProvider);
    } catch (err) {
      console.log(err);
    }
  };
  //Sign out
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };
  //Get current user
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(auth?.currentUser?.email!);
    } else {
      setUser('');
    }
  });

  return (
    <form className='auth'>
      <input
        className='auth-input'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className='auth-input'
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleSignIn} className='auth-btn'>
        Sign In
      </button>
      <p>or</p>
      {/* <button onClick={handleGoogleSignIn}>Sign In With Google</button> */}
      <GoogleButton
        onClick={handleGoogleSignIn}
        style={{ transform: 'scale(0.85)' }}
      />
      <button onClick={handleSignOut} className='auth-btn'>
        Sign out
      </button>
      <p>User: {user}</p>
    </form>
  );
};
