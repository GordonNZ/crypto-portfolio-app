import React from 'react';
import './SignIn.css';
import { Auth } from '../../components/authentication/Auth';
import { auth } from '../../config/firebase';

type Props = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

const SignIn = ({ user, setUser }: Props) => {
  //Sign out user
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='signIn home'>
      {user ? (
        <main>
          <h1>You are signed in!</h1>
          <p className='signedIn-user'>User email: {user}</p>
          <button onClick={handleSignOut} className='auth-btn'>
            Sign out
          </button>
        </main>
      ) : (
        <main>
          <h1>Sign In</h1>
          <Auth />
        </main>
      )}
    </div>
  );
};

export default SignIn;
