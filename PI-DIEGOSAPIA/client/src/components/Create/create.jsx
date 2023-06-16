import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { getPlatforms, CreateVideogame, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from'react-router-dom';
import style from './create.module.css';
import validations from './validations'

const CreateVideogames = () => {

    const dispatch = useDispatch()
    const platforms = useSelector((state) => state.platforms)
    const genres = useSelector((state) => state.genres)
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        background_image: "",
        description: "",
        genres: [],
        released: "",
        rating: 0,
        platforms: []
    })
    const [error, setError] = useState({
        name: "",
        background_image: "",
        description: "",
        genres: [],
        released: "",
        rating: "",
        platforms: []
    })


    useEffect(() => {
        dispatch(getPlatforms());
        dispatch(getGenres());
    }, [dispatch]);

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

 const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getGenres(event.target.value))
        dispatch(CreateVideogame(form))
        navigate('/home')
        
    }

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


    return (
        <form onSubmit={handleSubmit} className={style.formContainer}>
            <div className={style.reset}> 
            <button onClick={resetData} className={style.resetB}>Data reset</button>
            </div>

            <div className={style.inputContainer}>
                <label htmlFor="name" className={style.label}>Name:  <input type="text" name="name" value={form.name} onChange={handleChange} className={style.input} autocomplete="off"/></label>
                {error.name && <p className={style.errorName}> {error.name}</p>}
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="description" className={style.label}>Description:  <input type="text" name="description" value={form.description} onChange={handleChange} className={style.inputD} autocomplete="off" /></label>
                {error.description && <p className={style.errorDescription}> {error.description}</p>}
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="released" className={style.label}>Released:  <input type="date" name="released" value={form.released} onChange={handleChange} className={style.input} autocomplete="off" /></label>
                {error.released && <p className={style.errorReleased}> {error.released}</p>}
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="background_image" className={style.label}>Image:  <input type="url" name="background_image" value={form.background_image} onChange={handleChange} className={style.input} autocomplete="off" /></label>
                {error.image && <p className={style.errorImage}> {error.image}</p>}
            </div>
            <div className={style.imageContainer}>
            </div>
            <label htmlFor="genres" className={style.label}>Select your Genres: </label>
            <div className={style.checkboxContainer}>
                {genres.map((genre) => (
                    <label key={genre.name} className={style.genres}>
                        <input type="checkbox" name="genres" checked={form.genres.includes(genre.name)} value={genre.name} onChange={handleGenresChange} />  {genre.name} </label>))}
                        {error.genres && <p style={{ color: 'red' }}> {error.genres}</p>}
            </div>
            <div className={style.checkboxContainer}>
                <label htmlFor="platforms" className={style.label}>Select your Platforms </label>
                <div className={style.checkboxContainer}>
                    {platforms.map((p) => (
                        <label key={p.valor} className={style.p}>
                            <input type="checkbox" name="platforms" checked={form.platforms.includes(p.valor)} value={p.valor} onChange={handlePlatformChange} />  {p.valor} </label>))}
                            {error.platforms && <p style={{ color: 'red' }}> {error.platforms}</p>}
                </div>
                <label htmlFor="rating" className={style.label}>Rating:  {form.rating}<input type="range" name="rating" min="0" max="5" value={form.rating} onChange={handleChange} className={style.slider} /> </label>






                <div>
                    {/* <select name="platform" value={form.platform} onChange={handleChange} className={style.select}>
                        <option value="">Select a platform</option>
                        {platforms.map((platform) => (
                            <option key={platform} value={platform.name}>
                               {platform.valor}
                            </option>
                        ))}
                    </select> */}


                </div>

            </div>




            <button className={style.submitButton} disabled={Object.keys(error).length > 0} type="submit">Create Videogame</button>

        </form>
    )






}
export default CreateVideogames;