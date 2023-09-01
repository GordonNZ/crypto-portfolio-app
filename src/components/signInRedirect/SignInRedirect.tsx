import React from 'react';
import './SignInRedirect.css';
import { Link } from 'react-router-dom';

type Props = {};

const SignInRedirect = (props: Props) => {
  return (
    <div className={`modal enter-done signInRe-modal`}>
      <div className='signInRedirect-main'>
        <h1>Sign in to view your portfolio!</h1>
        <Link to='/signin' className='signin'>
          Go to Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignInRedirect;
