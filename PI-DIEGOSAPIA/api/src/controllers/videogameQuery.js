const axios = require('axios');
require('dotenv').config();
const {Videogame, Genre} = require('../db')
const {API_KEY} = process.env;
const {Op} = require('sequelize');



const videogameQuery = async (name)=>{
    let videogamesApi= []
   
     
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
         {

     for (let i = 0 ; i < 15 ; i++) {
        const {id,name,background_image,genres,rating,released,platforms} = response.data.results[i];
        const generos = genres.map(g=> g.name)
        const plataformas = platforms.map(p=> p.platform.name)
                
        videogamesApi.push({id,name,background_image, genres:generos, platforms:plataformas, rating, released})
            }

};
    const responseBd = await Videogame.findAll({
    where : {
        name:{[Op.iLike]: `%${name}%` }
    },
    include:{
        model: Genre,
        attributes: ["name"],
        
             }
}); 
   const total = [...videogamesApi, ...responseBd]
   return total;
};


module.exports = {videogameQuery};