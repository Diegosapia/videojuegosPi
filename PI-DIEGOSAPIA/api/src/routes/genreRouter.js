const { Router }= require('express');
const genreRouter = Router();
const {genresHandler} = require('../handlers/genresHandler');


genreRouter.get('/',genresHandler);


module.exports = genreRouter;