import { auth, gooogleProvider } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';

export const Auth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
  const user = auth?.currentUser?.email;

  return (
    <div>
      <input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleSignIn}>Sign In</button>

      <button onClick={handleGoogleSignIn}>Sign In With Google</button>

      <button onClick={handleSignOut}>Sign out</button>
      <p>User: {user}</p>
    </div>
  );
};
