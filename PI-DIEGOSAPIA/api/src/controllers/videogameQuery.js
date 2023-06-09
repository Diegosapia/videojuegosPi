const axios = require('axios');
require('dotenv').config();
const {Videogame, Genre} = require('../db')
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const { platform } = require('os');


const videogameQuery = async (name)=>{
    let array= []
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)

    for (let i = 0 ; i < 15 ; i++) {
    const {id,name,background_image,genres,rating,released,platforms} = response.data.results[i];
    const generos = genres.map(g=> g.name)
    const plataformas = platforms.map(p=> p.platform.name)
    console.log(response.data.results[i])
    array.push({id,name,background_image, generos, plataformas, rating, released})

};
    const responseBd = await Videogame.findAll({
        where : {
            name:{[Op.iLike]: `%${name}%` }
        },
        include:{
            model: Genre,
            attributes: ["name"],
            through:{
                attributes:[],
                    }
                 }
    });

    if (responseBd.length > 0) {
        for(let i = 0; i < responseBd.length; i++) {
            const {id, name, background_image, rating, genres, released, platforms} = responseBd[i]
            const generos = genres.map(g=> g.name)
            const plataformas = platforms.map(p=> p.platform.name)
            array.push({id,name,background_image,rating,released, generos, plataformas});
        }
    }
   return array;
};


module.exports = {videogameQuery};