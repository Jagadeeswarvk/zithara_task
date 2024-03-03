import React from "react";

function SearchBar({ searchTerm, onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by name or location"
      />
    </div>
  );
}

export default SearchBar;
