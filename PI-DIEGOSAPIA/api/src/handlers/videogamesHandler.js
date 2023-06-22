const { getAllVidegamesInfo } = require("../controllers/getVideogame");
const { videogameQuery } = require("../controllers/videogameQuery");
const { getIdVideogame } = require("../controllers/getIdVideogame");
const { createVideogame } = require("../controllers/createVideogame");




//------------------------------------------------------------------------------------------//
///////   buscar todos los juegos //////////
const getVideogame = async (req, res) => {
  try {
    const response = await getAllVidegamesInfo();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
//------------------------------------------------------------------------------------------//
//////////    buscar game por nombre ///////
                                        ///  http://localhost:3001/videogames?name=Doom

const getNameVideogame = async (req, res, next) => {
  const {name} = req.query
  if (name) {
    try {
      // si se recibe nombre ///
      
        const response = await videogameQuery(name);
          res.status(200).json(response);
        } 
           catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    next();
  }
};
//------------------------------------------------------------------------------------------//
///// busca el videogame por ID ////

const getVideogameId = async (req, res) => {
  const id = req.params.id;
  const origen = isNaN(id) ? 'bd' : 'api'
  
  try {
    const result = await getIdVideogame(id, origen);
  
    if (result) {
      res.status(200).json(result);
    
    }
  } catch (error) {
    
     res.status(501).send({error:error.message});
  }
};
//------------------------------------------------------------------------------------------//
//// agrega el videogame a la base de datos ////
const addVideogame = async (req, res) => {
  
  /// destructura la info recibida por body ////
  try {
    const {name,description,platforms,rating,background_image,released,genres} = req.body;
    //if(name )
    
    if (!name) {
      return res.status(400).send("we missing info");
    } else {
      const newVideogame = await createVideogame(
        name,
        description,
        platforms,
        rating,
        background_image,
        released,
        genres
      );

      if(newVideogame.error){
        return res.status(404).send(newVideogame.error)
          
      }
      return res.status(200).send("Videogame created");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNameVideogame,
  getVideogame,
  getVideogameId,
  addVideogame,
};
