const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
///const { getAllVidegamesInfo } = require("../controllers/getVideogame");

/// http://localhost:3001/videogames/2344

const getIdVideogame = async (id) => {
  if (!id.includes("-")) {
    const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const description = detalle.data.description_raw;
    return description;
  } else {
    let encontrado = await Videogame.findByPk(id, {
      includes: [
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
  }
  return arr;
};
module.exports = {
  getIdVideogame,
};
