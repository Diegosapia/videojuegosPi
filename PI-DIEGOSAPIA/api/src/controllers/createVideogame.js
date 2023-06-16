const {getGames} = require('./getVideogame')
const { Videogame , Genre} = require('../db');
const {videogameQuery}= require('../controllers/videogameQuery.js');


const createVideogame = async (name, description, platforms, rating,background_image ,released , genres) =>{

    let isRepeated= await Videogame.findOne({ where: { name: name }})
    let api = await getGames() 
    const includesVideogame = await  api.filter((element) =>
    element.name.toLowerCase().includes(name.toString().toLowerCase()))
 console.log(isRepeated)
 console.log(api)
 console.log(includesVideogame)
    
    if(isRepeated[0] || includesVideogame[0]) {
        throw new Error('This game alredy exist')
    }else { 
            const newVideogame = await Videogame.create(
                {
                    name ,
                    description,
                    platforms,
                    rating, 
                    background_image,
                    released,
                    
                })
                
               let genreBd = await Genre.findAll({
                   where : {name : genres},
               });
            
               newVideogame.addGenres(genreBd);
               return newVideogame;
        } 
 
}

module.exports = {
    createVideogame
}