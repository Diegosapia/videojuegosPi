const {getGames} = require('./getVideogame')
const { Videogame , Genre} = require('../db');
const {videogameQuery}= require('../controllers/videogameQuery.js');


const createVideogame = async (name, description, platforms, rating,background_image ,released , genres) =>{


    let isRepeated= await Videogame.findOne({ where: { name: name }})
    
    
    


    
    if(isRepeated ) {
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
 


















    // let isRepeated= await Videogame.findOne({ where: { name: name }})
    //  let api = await getGames(name) 
    //   const includesVideogame = await  api.filter((element) =>
    //  element.name.toLowerCase().includes(name.toString().toLowerCase()))

    // if(!isRepeated && !includesVideogame ) {
    //     const newVideogame = await Videogame.create(
    //             {
    //                 name ,
    //                 description,
    //                 platforms,
    //                 rating, 
    //                 background_image,
    //                 released,
                    
    //             })
                
    //            let genreBd = await Genre.findAll({
    //                where : {name : genres},
    //            });
            
    //            newVideogame.addGenres(genreBd);
               
    //            return newVideogame;
    // }else { 
    //     throw new Error('This game alredy exist')
               
    //     } 
 
}

module.exports = {
    createVideogame
}