import React, { useState } from 'react';
import './AddTransaction.css';
import Search from '../search/Search';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Props {
  currency: string;
  getPortfolio: () => void;
  showModal: boolean;
  onClose: () => void;
  userId: string;
}

const AddTransaction: React.FC<Props> = ({
  currency,
  getPortfolio,
  showModal,
  onClose,
  userId,
}: Props) => {
  return (
    <CSSTransition
      in={showModal}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className='addTxn'>
          <div className='addTxnContainer flex'>
            <h2>Add Transaction</h2>
            <button onClick={onClose} className='exitBtn'>
              <Cross2Icon className='radixIcon' />
            </button>
          </div>
          <Search
            currency={currency}
            getPortfolio={getPortfolio}
            onClose={onClose}
            userId={userId}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default AddTransaction;
