import React from 'react';
import './SignIn.css';
import { Auth } from '../../components/authentication/Auth';

type Props = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

const SignIn = ({ user, setUser }: Props) => {
  return (
    <div className='signIn home'>
      <main>
        <h2>Sign In</h2>
        <Auth user={user} setUser={setUser} />
      </main>
    </div>
  );
};

export default SignIn;
