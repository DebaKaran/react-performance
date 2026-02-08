import React from 'react'

const Pagination = ({ currentPage, totalPages, handlePageChange, handlePrev, handleNext }) => {

  return (
    <div className="pagination-container"> 
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="page-arrow"
        >
          ◀
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <span key={i} className={`page-number ${
        currentPage === i + 1 ? "active" : ""
      }`} onClick={() => handlePageChange(i)}>{i + 1}</span>
        ))}

         {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="page-arrow"
        >
          ▶
        </button>
      </div>
  )
}

export default Pagination