const axios = require('axios');
require('dotenv').config();
const {Videogame, Genre} = require('../db')
const {API_KEY} = process.env;
const {Op} = require('sequelize');


const videogameQuery = async (name)=>{
    let array= []
      
       
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)

    for (let i = 0 ; i < 15 ; i++) {
    const {id,name,background_image,genres,rating} = response.data.results[i];
    const generos = genres.map(g=> g.name)
    array.push({id,name,background_image, generos, rating})

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
            const {id, name, background_image, rating, genres} = responseBd[i]
            const generos = genres.map(g=> g.name)
            array.push({id,name,background_image,rating,generos});
        }
    }
   return array;
};


module.exports = {videogameQuery};