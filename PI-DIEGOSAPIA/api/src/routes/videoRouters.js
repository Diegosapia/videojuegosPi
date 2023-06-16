const {Router} = require('express');

const {getNameVideogame,
    getVideogame,
    getVideogameId,
    addVideogame} = require('../handlers/videogamesHandler')

const videoRouters = Router();

videoRouters.get('/', getNameVideogame);

videoRouters.get('/', getVideogame);

videoRouters.get('/:id',getVideogameId );

videoRouters.post('/', addVideogame);



module.exports = videoRouters;