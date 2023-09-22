import React from 'react';
import './Footer.css';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className='flex'>
      <p>Developed by Gordon Zam</p>
      <div className='footerLinks'>
        <ul className='flex'>
          <li>
            <a
              href='https://github.com/GordonNZ'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/gordonzam/'
              target='_blank'
              rel='noreferrer'
            >
              Linkedin
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
