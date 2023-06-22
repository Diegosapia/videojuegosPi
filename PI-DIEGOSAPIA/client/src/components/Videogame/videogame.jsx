import React from 'react';
import { Link } from 'react-router-dom';
import style from './videogame.module.css';




const Videogame = ({ id, name, background_image, genres, rating}) => {
    

    return (
        <div className={style.conteiner}>
            <div className={style.card}>
                <div className={style.border}>
                    <img src={background_image} alt={name} className={style.img} />
                    <h1 className={style.textname}> {name}</h1>
                    <h2 className={style.generos}>Genres: {genres}</h2>
                    <h2 className={style.rating}>Rating: {rating}</h2>
                    <Link to={`/detail/${id}`} className={style.link} >
                        <button className={style.boton}>-More Info-</button>
                    </Link>
                </div>
            </div>
        </div>
    )



};

export default Videogame;