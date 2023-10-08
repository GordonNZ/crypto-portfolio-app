type Props = {
  currency: string;
  handleSetCurrency: (currency: string) => void;
};

export const Currency = ({ currency, handleSetCurrency }: Props) => {
  return (
    <div className='flex currencySelect'>
      <p>Currency: </p>
      <select
        name='currency'
        className='currencyOptions'
        defaultValue={currency}
        onChange={(e) => {
          handleSetCurrency(e.target.value);
        }}
      >
        <option
          value='NZD'
          // onClick={() => {
          //   handleSetCurrency('NZD');
          // }}
        >
          NZD
        </option>
        <option
          value='USD'
          // onClick={() => {
          //   handleSetCurrency('USD');
          // }}
        >
          USD
        </option>
        <option
          value='AUD'
          // onClick={() => {
          //   handleSetCurrency('AUD');
          // }}
        >
          AUD
        </option>
        <option
          value='EUR'
          // onClick={() => {
          //   handleSetCurrency('EUR');
          // }}
        >
          EUR
        </option>
        <option
          value='HKD'
          // onClick={() => {
          //   handleSetCurrency('HKD');
          // }}
        >
          HKD
        </option>
        <option
          value='GBP'
          // onClick={() => {
          //   handleSetCurrency('GBP');
          // }}
        >
          GBP
        </option>
      </select>
    </div>
  );
};
