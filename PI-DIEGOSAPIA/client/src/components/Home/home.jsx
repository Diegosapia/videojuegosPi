import { useEffect, useState } from "react";
import {useDispatch , useSelector} from 'react-redux'
import {getGames,getGenres,cleanDetail,filterOrigen,filterByGenres,filterGames,orderBy} from '../../redux/actions'
import style from './home.module.css';
import Videogames from "../Videogames/videogames";
import Paginado from "../Paginado/paginado";

const Home = () => {
    /// declaro la constante dispatch para igualarla al hook useDispatch()
    const dispatch = useDispatch();
    let allVideogames = useSelector((state)=> state.videogames);
    let allGenres = useSelector((state)=> state.genres);
    let filteredGames = useSelector((state)=> state.filtered);
    

  (filteredGames.length > 0) && (allVideogames = filteredGames)
    ///////////////   paginado //////////////
//// declaro los estados locales para hacer el paginado correspondiente a la cantidad de videogames por pagina
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage]= useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame)    

    //// declaro pagina como setCurrentpage(pageNumber)
    const pagina = (pageNumbers) =>{
        setCurrentPage(pageNumbers)

    }
    
//// utilizo el useEffect para controlar que se cargen los genres y los juegos cada ves que se monte la pagina
//// ademas utilizo un cleanDetail para limpiar los detalles traidos para renderizar el detial
     useEffect(() => {
         dispatch(getGames());
        dispatch(getGenres());
        
         return () => dispatch(cleanDetail())
     },[dispatch]);

    
/// declaro y seteo el handler para "resetear" la info renderizada 
    const getVideogameHandler = (event) =>{
        event.preventDefault();
        dispatch(getGames());
    };
//// declaro y seteo el handler para el ordenamiento alfabetico, despachando el evento a la action filterGames 
    const orderHandler = (event) =>{
        dispatch(filterGames(event.target.value));
        setCurrentPage(1);
    };
//// declaro y seteo el handler para filtrado por origen, despacho el evento a la action getSort
    const origenHandler = (event) =>{
        dispatch(filterOrigen(event.target.value));
        setCurrentPage(1);
    }
/// declaro y seteo el handler para filtrado por genero y despacho el evento a la action filterByGenres
    const genresHandler = (event) =>{
        dispatch(filterByGenres(event.target.value));
        setCurrentPage(1);
    };
//// declaro y seteo el handler para filtrado por rating y despacho el evento a la action orderBy
    const ratingHandler = (event)=>{
        dispatch(orderBy(event.target.value));
        setCurrentPage(1);
    }

    
    return (
        <div >
        <div className={style.filters}>
{/* aca tengo las barras de selecs donde manejo el ordenamiento y filtros  */}
            <div className={style.conteiner} >
                <select className={style.selectInput}onChange={origenHandler}>
                    <option value='All'>All</option>
                    <option value='api'>Original</option>
                    <option value='bd'>Created</option>
                </select>
                <select className={style.selectInput}onChange={orderHandler}>
                    <option value="A">Original</option>
                    <option value="Original">A - Z</option>
                    <option value="D">Z - A</option>
                </select>
                <select className={style.selectInput}onChange={ratingHandler}>
                   <option value="Original"> Original </option>
                    <option value="BR">top rating</option>
                    <option value="SR">low rating</option>
                </select>
                <select className={style.selectInput}name="types" onChange={genresHandler}>
                    <option value="All">All Genres</option>
                    {allGenres.map((genre) => (
                        <option value={genre.name} key={genre.name}>{genre.name}</option>
                        ))}
                </select>
                <button className={style.button}onClick={(event) => { getVideogameHandler(event) }}>Reset</button>
            </div>
        </div>
            <div className={style.videogames}>
                {/* en esta parte estoy renderizando el componente videogames pasandole como parametro 'currentVideogames''
que muestra los 15 videogames por pagina ya creados previamente en el estado local  */}
            <Videogames currentVideogames={currentVideogames} />
            
            <Paginado pagina={pagina}
             videogamesPerPage={videogamesPerPage}
              allVideogames={allVideogames.length}
              currentPage={currentPage} />
              
            </div>

           </div>
       
    )
}
export default Home;