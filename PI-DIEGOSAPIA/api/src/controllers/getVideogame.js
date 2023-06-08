const axios = require("axios");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;



////   se hace la consulta a la api iterandola 6 veces para lograr    ///
///    la cantidad de juegos pedidos por el readme                     ///
const getGames = async () => {
  const arrayVg = [];

  for (let i = 0; i < 6; i++) {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);//&page=${i}
    response.data.results.map((e) => {
      arrayVg.push({
        id: e.id,
        name: e.name,
        background_image: e.background_image,
        genres: e.genres.map((e) => e.name).join(", "),
        released: e.released,
        rating: e.rating,
        platform: e.platforms.map((e) => e.platform.name).join(", "),
      });
    });
  }
  return arrayVg;
};



 /// se hace consulta a la base de datos ///
const getInfoBd = async () => {
   const dbInfo = await Videogame.findAll({
       include: {
           model: Genre,
           attribute: ["name"],
           through: {
               attributes : [],
           }
       }
   });
    return dbInfo;
   };

/// junto las dos informaciones y las devuelvo ///

const getAllVidegamesInfo = async()=>{
   const apiInfo = await getGames();
   const dbInfo = await getInfoBd();
   const allInfo = apiInfo.concat(dbInfo);
   return allInfo;
}






module.exports = { getAllVidegamesInfo};
