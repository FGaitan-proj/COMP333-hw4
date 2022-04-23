const Search = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search By Song </span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search Song "
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);

export default Search;
