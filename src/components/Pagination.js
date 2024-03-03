import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < 3) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>Prev</button>
      <span>{`Page ${currentPage} of ${3}`}</span>
      <button onClick={handleNextClick} disabled={currentPage === 3}>Next</button>
    </div>
  );
}

export default Pagination;