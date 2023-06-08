const axios = require("axios");
require('dotenv').config();
const { Videogame, Genre, Plataform} = require('../db');
const Platform = require("../models/Platform");
const { API_KEY } = process.env;



const getPlatforms = async ()=>{
    const response = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
const plataformsApi = response.data.results.map(el=> el.name)
plataformsApi.forEach (async el => {
    await Plataform.findOrCreate({
        where: {
            name: el
        }
    })
});
const allPlataforms = await Platform.findAll();

return allPlataforms;
};



module.exports = {getPlatforms}