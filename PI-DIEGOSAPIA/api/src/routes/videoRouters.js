const {Router} = require('express');

const {getNameVideogame,
    getVideogame,
    getVideogameId,
    addVideogame} = require('../handlers/videogamesHandler')
/// modularice las rutas relacionadas a videogames, 3 get y el post
const videoRouters = Router();

videoRouters.get('/', getNameVideogame);

videoRouters.get('/', getVideogame);

videoRouters.get('/:id',getVideogameId );

videoRouters.post('/', addVideogame);



module.exports = videoRouters;