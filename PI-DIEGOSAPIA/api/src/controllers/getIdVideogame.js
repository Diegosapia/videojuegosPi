const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");



/// http://localhost:3001/videogames/2344

const getIdVideogame = async (id) => {
  if (id.includes("-")) {
    let encontrado = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    let arr = arr.push(encontrado);
    return arr;
  } else {
    let resp = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        let obj = {
          id: resp.data.id,
          name: resp.data.name,
          description: resp.data.description_raw,
          background_image: resp.data.background_image,
          released: resp.data.released,
          rating: resp.data.rating,
          platforms: resp.data.platforms.map(p => p.platform.name),
          genres: resp.data.genres.map(e=> e.name),
        }
        return obj
  }
  
};
module.exports = {
  getIdVideogame,
};
