type Props = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

export const PortfolioSortBy = ({ sortBy, setSortBy }: Props) => {
  return (
    <div className='flex portfolio-sortBy'>
      <p>Sort By: </p>
      <select name='currency' className='' defaultValue={sortBy}>
        <option
          value='holding'
          onClick={() => {
            setSortBy('holding');
            console.log(sortBy);
          }}
        >
          Holding
        </option>
        <option
          value='name'
          onClick={() => {
            setSortBy('name');
          }}
        >
          Name
        </option>
        <option
          value='timestamp'
          onClick={() => {
            setSortBy('timestamp');
          }}
        >
          Date Added
        </option>
      </select>
    </div>
  );
};
