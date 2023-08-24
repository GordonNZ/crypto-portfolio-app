import React, { useState, useEffect } from 'react';
import FetchCoinPrice from '../../components/fetchCoinPrice/FetchCoinPrice';

type Props = {
  coin: {
    id: string;
    coin: string;
    holding: number;
    icon: string;
    name: string;
  };
  currency: string;
  updatedHolding: number;
  setUpdatedHolding: React.Dispatch<React.SetStateAction<number>>;
  updateHolding: (id: string) => void;
  deleteCoin: (id: string) => void;
  showEdit: boolean;
  handlePriceUpdate: (price: number) => void;
};

export const PortfolioLayout = ({
  coin,
  currency,
  updatedHolding,
  setUpdatedHolding,
  updateHolding,
  deleteCoin,
  showEdit,
  handlePriceUpdate,
}: Props) => {
  const [edit, setEdit] = useState(false);

  //displaying numbers rounded to 5 decimals, but removing unneeded tailing zeros of other numbers
  const roundNumber = (num: number) => {
    if (Number.isInteger(num)) {
      return num;
    } else {
      const rounded = num.toFixed(5);
      return parseFloat(rounded).toString(); // Remove trailing zeros
    }
  };

  // const [totalValue, setTotalValue] = useState(0); // Add this line

  // useEffect(() => {
  //   const coinHolding = edit ? updatedHolding : coin.holding;
  //   const coinPrice = (
  //     <FetchCoinPrice coinName={coin.coin} currency={currency} holding={null} />
  //   ); // You need to get the price from the FetchCoinPrice component

  //   console.log(coinPrice);
  //   // Calculate the total value by multiplying the holding with the price
  //   // const value = coinHolding * coinPrice;
  //   // setTotalValue(value);
  // }, [coin.holding, coin.coin, currency, edit, updatedHolding]);

  return (
    <tr key={coin.id}>
      <td>
        <div className='portfolio-coin'>
          <img src={coin.icon} alt={coin.name} className='portfolio-coinImg' />
          <p>{coin.name}</p>
        </div>
      </td>

      <td>
        $
        <FetchCoinPrice
          coinName={coin.coin}
          currency={currency}
          holding={null}
        />
      </td>
      <td>24 hour price</td>
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
          roundNumber(coin.holding)
        )}
      </td>
      <td>
        $
        <FetchCoinPrice
          coinName={coin.coin}
          currency={currency}
          holding={coin.holding}
          onPriceUpdate={handlePriceUpdate}
        />
      </td>
      {showEdit ? (
        <td className={'portfolio-btns'}>
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
      ) : (
        ''
      )}
    </tr>
  );
};
