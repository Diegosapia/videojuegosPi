import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getGamesId,cleanDetail } from '../../redux/actions';
import style from './detail.module.css';



function GameDetail() {
    const dispatch = useDispatch()
    const videosD = useSelector(state => state.detail)
    
    const { id } = useParams()

    useEffect(() => {
        dispatch(getGamesId(id));
        return () => {
            dispatch(cleanDetail());
        }
    }, [id, dispatch]);


return  (
    <div className={style.container} >

        <div className={style.imgC}>
            <img src={videosD.background_image} className={style.img} alt='Imagen descrictiva' />
        </div>
        <div className={style.name} >
            <h1>{videosD.name}</h1>
        </div>
        <div className={style.textdescription}>
            <p dangerouslySetInnerHTML={{ __html: videosD.description }} />
        </div>
        <div className={style.plataformas} >
            <label>Platforms: </label>
            <ul>
                {
                    videosD.platforms?.map((pla) => {
                        return (
                            <li>{pla}</li>
                            )
                        })
                    }
            </ul>
        </div>
        <div className={style.genres} >
            <label>Genres: </label>
            <ul>
                {
                    videosD.genres?.map((pla) => {
                        return (
                            <li>{pla}</li>
                            )
                        })
                    }
            </ul>
        </div>
        <div className={style.rating}>
            <h3>Rating: {videosD.rating}</h3>
        </div>

        <div className={style.fecha}>
            <h3>Released: {videosD.released}</h3>
        </div>
<Link to={`/home`} className={style.bHome}><button className={style.bhome}>GO BACK TO HOME</button></Link>
    </div>

)
    

};

export default GameDetail;