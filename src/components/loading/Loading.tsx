import React from 'react';
import './Loading.css';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className='home'>
      <div className='coinPage loadingComponent'>
        <span className='loader'></span>
      </div>
    </div>
  );
};

export default Loading;
