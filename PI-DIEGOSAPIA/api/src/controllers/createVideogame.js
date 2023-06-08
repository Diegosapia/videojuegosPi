
const { Videogame , Genre} = require('../db');
const {getGenres}= require('../controllers/getGenre');


const createVideogame = async (name, description, platforms, rating,background_image ,released , genres) =>{

    let isrepeat= await Videogame.findOne({ where: { name: name }})
      
    if(!isrepeat) {
            
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