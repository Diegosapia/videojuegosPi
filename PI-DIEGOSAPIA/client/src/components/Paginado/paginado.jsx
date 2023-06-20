import React from "react";
import style from './paginado.module.css';

const Paginado = ({ videogamesPerPage, allVideogames,currentPage, pagina }) => {
   
     
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i)
    }



    
// const handlePreviusPage = () => {
//     if(currentPage > 1) {
//         pagina(currentPage -1)
//     }
// }
// const handleNextPage = () => {
//     if(currentPage < pageNumbers.length) {
//         pagina(currentPage + 1)
//     }
// }





    return (
        <nav className={style.paginado}>
            <ul className={style.numbers}>
            {/* <li>
            <button
              className={`${style.pageLink} ${currentPage === 1 ? style.disabled : ''}`}
              onClick={handlePreviusPage} disabled={currentPage === 1} > Previous </button>
          </li> */}
                { pageNumbers.map((number )=> (
                     <li key={number}>
                     <button
                       className={`${style.pageLink} ${number === currentPage ? style.activePage : ''}`}
                       onClick={() => pagina(number)}> {number} </button>
                   </li>  ))}
                   {/* <li>
            <button
              className={`${style.pageLink} ${currentPage === pageNumbers.length ? style.disabled : ''}`}
              onClick={handleNextPage} disabled={currentPage === pageNumbers.length}> Next </button>
          </li>     */}
                    
            </ul>
        </nav>
    )
}
export default Paginado;