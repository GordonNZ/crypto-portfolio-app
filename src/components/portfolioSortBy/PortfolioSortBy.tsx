type Props = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

export const PortfolioSortBy = ({ sortBy, setSortBy }: Props) => {
  return (
    <div className='flex portfolio-sortBy'>
      <p>Sort By: </p>
      <select
        name='currency'
        className=''
        defaultValue={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value='holding'>Holding</option>
        <option value='name'>Name</option>
        <option value='timestamp'>Date Added</option>
      </select>
    </div>
  );
};
