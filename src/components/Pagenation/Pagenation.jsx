import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './Pagenation.css'

export default function Pagenation({ handlePageChange , pageCount }) {
  const [counter, setCounter] = useState(0);


  
  return (
    <>
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      activeClassName="active"
      disabledClassName="disabled"
    />
    </>
  );
}
