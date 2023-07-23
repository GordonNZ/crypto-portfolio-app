import React from 'react';
import './SignIn.css';
import { Auth } from '../../components/authentication/Auth';

type Props = {};

const SignIn = (props: Props) => {
  return (
    <div className='signIn home'>
      <main>
        <h2>Sign In</h2>
        <Auth />
      </main>
    </div>
  );
};

export default SignIn;
