
import { Link } from "react-router-dom";
import style from './nav.module.css';
import SearchBar from '../SearchBar/searchbar.jsx';

const NavBar = () => {



    return (
        <nav className={style.conteiner}>
            <Link to="/home" className={style.home}>
                <button className={style.bhome}>Home</button>
            </Link>
            <Link to="/create" className={style.create}>
            <button className={style.bcreate}>Create Videogame </button>
          </Link>
            <div className={style.searchBar}>
                <SearchBar />
            </div>


        </nav>
    )
}

export default NavBar;