import React from "react";
import { useState, useEffect } from "react";
import { getPlatforms, CreateVideogame, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './create.module.css';
import validations from './validations'
import { Link } from 'react-router-dom';
const CreateVideogames = () => {

    const dispatch = useDispatch()


    /// 
    const platforms = useSelector((state) => state.platforms)
    const genres = useSelector((state) => state.genres)
    ///

    const navigate = useNavigate();
    ///
    const [form, setForm] = useState({
        name: "",
        background_image: "",
        description: "",
        genres: [],
        released: "",
        rating: 0,
        platforms: []
    })
    ////
    const [error, setError] = useState({
        name: "",
        background_image: "",
        description: "",
        genres: [],
        released: "",
        rating: "",
        platforms: []
    })
    ////
    useEffect(() => {
        dispatch(getPlatforms());
        dispatch(getGenres());
    }, [dispatch]);
    ////
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setError(validations({
            ...form,
            [event.target.name]: event.target.value
        }))
    }
    ////
    const handleGenresChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setForm((form) => ({
                ...form,
                genres: [...form.genres, value]
            }));
        } else {
            setForm((form) => ({
                ...form,
                genres: form.genres.filter((genre) => genre !== value)
            }));
        }
        setError((prevErrors) => ({
            ...prevErrors,
            genres: []
        }));
    };
    ////
    const handlePlatformChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setForm((form) => ({
                ...form,
                platforms: [...form.platforms, value]
            }));
        } else {
            setForm((form) => ({
                ...form,
                platforms: form.platforms.filter((p) => p !== value)
            }));
        }
        setError((prevErrors) => ({
            ...prevErrors,
            platforms: []
        }));
    };
    ////
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getGenres(event.target.value))
        dispatch(CreateVideogame(form))
        navigate('/home')

    }
    ////
    const resetData = (event) => {
        event.preventDefault()
        setForm({
            name: "",
            background_image: "",
            description: "",
            genres: [],
            released: "",
            rating: 0,
            platforms: []
        })
        setError({
            name: "",
            background_image: "",
            description: "",
            genres: [],
            released: "",
            rating: "",
            platforms: []
        })
    }
    ////
    return (
        <div className={style.contAll}>
            <div className={style.all}>
                <form onSubmit={handleSubmit} className={style.formContainer}>
                    <div className={style.contenedor}>
                        <Link to="/home" className={style.homet}><button className={style.homeb}> - GO BACK HOME - </button> </Link>
                        <div className={style.img}>
                            <img src="https://images.immediate.co.uk/production/volatile/sites/4/2022/05/Retro-games-consoles-a977a72.jpg?quality=90&webp=true&crop=4px,143px,1193px,513px&resize=940,400" className={style.img} alt=""></img>
                        </div>
                        <div><h1 className={style.title}> CREATE YOUR OWN VIDEOGAME</h1> </div>
                        <div className={style.reset}>

                            <button onClick={resetData} className={style.resetB}>Data reset</button>
                        </div>
                        <div className={style.inputContainer}>

                            <div className={style.error}>
                                {error.name && <span className={style.errorName}> {error.name}</span>}
                                <label htmlFor="name" className={style.label}>Name:  <input type="text" name="name" value={form.name} onChange={handleChange} className={style.input} autoComplete="off" /></label>
                            </div>
                            <div className={style.error}>
                                {error.description && <span className={style.errorDescription}> {error.description}</span>}
                                <label htmlFor="description" className={style.label}>Description:  <input type="text" name="description" value={form.description} onChange={handleChange} className={style.inputD} autoComplete="off" /></label>
                            </div>
                            <div className={style.error}>
                                {error.released && <span className={style.errorReleased}> {error.released}</span>}
                                <label htmlFor="released" className={style.label}>Released:  <input type="date" name="released" value={form.released} onChange={handleChange} className={style.input} autoComplete="off" /></label>
                            </div>
                            <div className={style.error}>
                                {error.image && <span > {error.image}</span>}
                                <label htmlFor="background_image" className={style.label}>Image:  <input placeholder="--IT HAS TO BE AN URL--   https:// ..." type="url" name="background_image" value={form.background_image} onChange={handleChange} className={style.input} autoComplete="off" /></label>
                            </div>
                        </div>
                        <div className={style.titulo}>
                        </div>
                        <label htmlFor="genres" className={style.label}>Select your Genres: </label>
                        <div className={style.checkboxContainer}>
                            {genres.map((genre) => (
                                <label key={genre.name} className={style.genres}>

                                    <input type="checkbox" name="genres" checked={form.genres.includes(genre.name)} value={genre.name} onChange={handleGenresChange} />  {genre.name} </label>))}

                        </div>
                            <div className={style.errorg}>
                                {error.genres && <span className={style.errog} > {error.genres}</span>}
                            </div>
                        <div className={style.titulo}>
                            <label htmlFor="platforms" className={style.label}>Select your Platforms </label>
                            <div className={style.checkboxContainer}>
                                {platforms.map((p) => (
                                    <label key={p.valor} className={style.p}>
                                        <input type="checkbox" name="platforms" checked={form.platforms.includes(p.valor)} value={p.valor} onChange={handlePlatformChange} />  {p.valor} </label>))}

                               
                            </div>
                               <div className={style.errorp}>
                                {error.platforms && <span > {error.platforms}</span>}
                                   
                               </div>
                            <label htmlFor="rating" className={style.ratin}>Rating ( 0 - 5 ):  {form.rating}<input type="range" name="rating" min="0" max="5" value={form.rating} onChange={handleChange} className={style.slider} /> </label>
                            <div>
                            </div>
                        </div>
                        <button className={style.submitButton} disabled={Object.keys(error).length > 0} type="submit">Create Videogame</button>
                        <Link to="/home" className={style.home}><button className={style.homeb}> - GO BACK HOME - </button> </Link>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateVideogames;