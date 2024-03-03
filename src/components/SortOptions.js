import React from "react";

function SortOptions({ sortOption, onSort }) {
  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div>
      <label>Sort By:</label>
      <select value={sortOption} onChange={handleSortChange}>
        <option value="">None</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
    </div>
  );
}

export default SortOptions;
