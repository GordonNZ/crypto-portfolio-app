import React, { useState } from 'react';
import FetchCoinPrice from '../../components/fetchCoinPrice/FetchCoinPrice';

type Props = {
  coin: {
    id: string;
    coin: string;
    holding: number;
  };
  currency: string;
  updatedHolding: number;
  setUpdatedHolding: React.Dispatch<React.SetStateAction<number>>;
  updateHolding: (id: string) => void;
  deleteCoin: (id: string) => void;
};

export const PortfolioLayout = ({
  coin,
  currency,
  updatedHolding,
  setUpdatedHolding,
  updateHolding,
  deleteCoin,
}: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <tr key={coin.id}>
      <td>{coin.coin}</td>
      <td>{coin.holding}</td>
      <td>
        $
        <FetchCoinPrice
          coinName={coin.coin}
          currency={currency}
          holding={null}
        />
      </td>
      <td>
        {edit ? (
          <input
            type='number'
            inputMode='numeric'
            placeholder='Amount'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUpdatedHolding(Number(e.target.value))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (updatedHolding === 0) {
                  setEdit(!edit);
                } else {
                  updateHolding(coin.id);
                  setUpdatedHolding(0);
                  setEdit(!edit);
                }
              }
            }}
            className='portfolio-holdingInput'
          />
        ) : (
          <FetchCoinPrice
            coinName={coin.coin}
            currency={currency}
            holding={coin.holding}
          />
        )}
      </td>
      <td className='portfolio-btns'>
        <button
          onClick={() => {
            if (updatedHolding === 0) {
              setEdit(!edit);
            } else {
              updateHolding(coin.id);
              setUpdatedHolding(0);
              setEdit(!edit);
            }
          }}
          className='portfolio-editBtn'
        >
          Edit
        </button>
        <button
          onClick={() => deleteCoin(coin.id)}
          className='portfolio-deleteBtn'
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
