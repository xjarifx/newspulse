interface Props {
  search: string;
  setSearch: (search: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<Props> = ({
  search,
  setSearch,
  handleSearch,
  isLoading,
}) => {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search here"
        className="input input-bordered w-full max-w-xs mr-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        className={`btn btn-primary ${isLoading || !search.trim() ? "no-animation cursor-default opacity-50" : ""}`}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
