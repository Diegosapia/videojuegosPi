import React from 'react';
import Videogame from '../Videogame/videogame';
import style from './videogames.module.css';




const Videogames = ({ currentVideogames }) => {
    // const allVideogames = useSelector((state) => state.videogames)

    return (
        <div className={style.cards}>
            {
                currentVideogames?.map((video) => {
                    return (
                        <Videogame
                            key={video.id}
                            id={video.id}
                            name={video.name}
                            background_image={video.background_image}
                            genres={video.genres}
                            rating={video.rating}
                        />
                    )
                })
            }

        </div>
    )
};

export default Videogames;