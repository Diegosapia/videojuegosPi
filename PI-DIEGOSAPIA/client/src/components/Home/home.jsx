import { useEffect, useState } from "react";
import {useDispatch , useSelector} from 'react-redux'
import {getGames,getGenres,cleanDetail,getSort,filterByGenres,filterGames,orderBy} from '../../redux/actions'
import style from './home.module.css';
import Videogames from "../Videogames/videogames";
import Paginado from "../Paginado/paginado";

const Home = () => {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state)=> state.videogames);
    const allGenres = useSelector((state)=> state.genres);

    ///////////////   paginado //////////////
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage]= useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame)    


    const pagina = (pageNumber) =>{
        setCurrentPage(pageNumber)
      
    }


    useEffect(() => {
        dispatch(getGames());
        dispatch(getGenres())
        return () => dispatch(cleanDetail())
    },[dispatch]);

    const getVideogameHandler = (event) =>{
        event.preventDefault();
        dispatch(getGames());
    };

    const orderHandler = (event) =>{
        dispatch(filterGames(event.target.value));
    };
    const formHandler = (event) =>{
        dispatch(getSort(event.target.value))
    }

    const genresHandler = (event) =>{
        dispatch(filterByGenres(event.target.value))
    };

    const ratingHandler = (event)=>{
        dispatch(orderBy(event.target.value))
    }

    return (
        <div >
            <div>
               
        </div>
            <div className={style.conteiner} >
                <select className={style.selectInput}onChange={formHandler}>
                    <option value='All'>Todos</option>
                    <option value='api'>Originales</option>
                    <option value='bd'>Creados</option>
                </select>
                <select className={style.selectInput}onChange={orderHandler}>
                    <option value="A">A - Z</option>
                    <option value="D">Z - A</option>
                </select>
                <select className={style.selectInput}onChange={ratingHandler}>
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
            <div className={style.videogames}>
                
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