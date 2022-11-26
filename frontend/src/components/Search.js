const Search = ({ newSearchHandler, newSearchValue }) => (
    <label>Search: <input onChange={newSearchHandler} value={newSearchValue}></input></label>
  );

export default Search;