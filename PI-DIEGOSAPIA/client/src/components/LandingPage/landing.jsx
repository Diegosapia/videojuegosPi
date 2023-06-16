import React from 'react';
import { Link } from 'react-router-dom';
import style from './landing.module.css';
import gamezone from './gamezone.png';


export default function LandingPage() {
    return (
    <div className={style.all}>
        <div className={style.landing}>
            <div className={style.imgC}>
                <div className={style.imgbox}>
                    <img src={gamezone} alt='landing' className={style.img} />
                </div>
                <h1 className={style.title} > Welcome to my VideoGames Store </h1>
                <div>
                    <Link to='/Home' >
                        <button className={style.button}> Come In ! </button>
                    </Link>
                </div>
            </div>
        </div>
     </div>
    )
};