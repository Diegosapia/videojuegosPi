import React from "react";
import style from './paginado.module.css';

const Paginado = ({ videogamesPerPage, allVideogames, currentPage, pagina }) => {

    const pageNumbers = [];

    let totalPages = Math.ceil(allVideogames / videogamesPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }
    if(currentPage > pageNumbers.length) {
        pagina(1)
    }
    return (
        <nav className={style.paginado}>
            <ul className={style.numbers}>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => pagina(number)}
                            className={`${style.pageLink} ${number === currentPage ? style.activePage : ''}`} > 
                            {number}
                             </button>
                    </li>))}
            </ul>
        </nav>
    )
}
export default Paginado;