import { useState } from "react";
 import { onSearch } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from './searchbar.module.css';

const SearchBar = () => {
    const dispatch = useDispatch()

    const [nameState, setNameState] = useState('')
    const [error, setError] = useState('')

    const handleSearch = (event) => {
        setNameState(event.target.value)
        setError('')
    }

    const handleClick = async () => {
        if (nameState.trim() === ''){ 
            setError("Insert a name to search a game")
    } else {
        try {
                await dispatch(onSearch(nameState))
       
} catch (error) {
    setError("Ups sorry, we don't know that game ")
}
     } 
    }     
       return (
        <div>
            <input type="search" placeholder="search" value={nameState} onChange={handleSearch} />
            <button className={style.searchb} onClick={()=>{handleClick(); setNameState('')}}>Search</button>
            {error && <p className={style.error}>{error}</p>}
        </div>
       ) 
}
 export default SearchBar