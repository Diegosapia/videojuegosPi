import React from 'react' ;
import { Link } from'react-router-dom';
import style from './landing.module.css'


export default function LandingPage() {
    return (
        <div className={style.contenedor}>
            <div>
                <h1 className={style.title} > -- </h1>
                <Link to='/Home' > <button className={style.button}> Ingresa </button></Link>

            </div>
        </div>
    )
};