import React, { useState } from 'react'
// import { useTheme } from './Theme';
import { useFilter } from './Filterdata';

function Pagination({ currentpage, setCurrentpage, pages }) {

  const { themeMode } = useFilter();

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const handlePagenumberclick = (evt) => {
    setCurrentpage(Number(evt.target.id))
  }

  const handleNextBtn = () => {
    setCurrentpage(currentpage + 1);
    if (currentpage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlePreviousBtn = () => {
    setCurrentpage(currentpage - 1);

    if ((currentpage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePreviousBtn}>&hellip;</li>
  }

  const randerPagenumber = pages.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li id={number} key={number} onClick={handlePagenumberclick} className={currentpage == number ? "active" : ""}>{number}</li>
      )
    }
    else {
      return null;
    }
  })

  return (
    <div className="d-flex justify-content-center">
      <ul className={`pageNumbers ${themeMode ? "dark-pagination" : "pageNumbers"}`}>
        <li>
          <button onClick={handlePreviousBtn}
            disabled={currentpage == pages[0] ? true : false}><i className="fa-solid fa-arrow-left"></i></button>
        </li>
        {pageDecrementBtn}
        {randerPagenumber}
        {pageIncrementBtn}
        <li>
          <button onClick={handleNextBtn}
            disabled={currentpage == pages[pages.length - 1] ? true : false}><i className="fa-solid fa-arrow-right"></i></button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
