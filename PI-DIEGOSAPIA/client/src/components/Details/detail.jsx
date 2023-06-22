import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getGamesId,cleanDetail } from '../../redux/actions';
import style from './detail.module.css';



function GameDetail() {
////
    const dispatch = useDispatch()
    //// useSelector() se usa para recuperar el estado de la tienda Redux.
    const videosD = useSelector(state => state.detail)
   ////
   
    const { id } = useParams()
    
   ////
    useEffect(() => {
        dispatch(getGamesId(id));
        return () => {
            dispatch(cleanDetail());
        }
    }, [id, dispatch]);
///
return  (
<div key={id} className={style.all}>
    <div className={style.container} >
         <Link to={`/home`} className={style.bHome}><button className={style.bhome}>GO BACK TO HOME</button></Link>
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
            <label className={style.maps}>Platforms: </label>
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
            <label className={style.maps}>Genres: </label>
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
            <h3><span className={style.rat}>Rating: </span> {videosD.rating}</h3>
        </div>
        <div className={style.fecha}>
            <h3> <span className={style.released}> Released:</span> {videosD.released}</h3>
        </div>
        <Link to={`/home`} className={style.bHome}><button className={style.bhome}>GO BACK TO HOME</button></Link>
    </div>
</div>
)
};

export default GameDetail;