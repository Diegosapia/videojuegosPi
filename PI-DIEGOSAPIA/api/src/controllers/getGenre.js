const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

const getGenres = async () => {
  

  const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const apiGenres = response.data.results.map((g) => g.name);

  apiGenres.forEach(e=> Genre.findOrCreate({
    where: {
      name: e
    }
  }))
  const allGenres = await Genre.findAll();

  return allGenres;
};

module.exports = { getGenres };
