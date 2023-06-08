const { getAllVidegamesInfo } = require('../controllers/getVideogame')
//const {videogameQuery} = require ('../controllers/videogameQuery')
const {getIdVideogame} = require('../controllers/getIdVideogame')
const {createVideogame} = require('../controllers/createVideogame')
//const {getAllVideoInfo} = require('../controllers/getAllVideogames')

///////   buscar todos los juegos //////////
/////termine fucionando los handlers de obtener todos los juegos y por query //////

//const getVideogame = async (req, res) => {
   // try {
     //  const response = await getGames()
      //  res.status(200).json(response)
        
   // } catch (error) {
   // res.status(400).send({error : error.message})    
   /// }

//};

//////////    buscar game por nombre , si no hay nombre por query ///////
///////////   buscar todos los juegos /////////

///  http://localhost:3001/videogames?name=Doom

const getNameVideogame = async (req,res) => {
  const  name  = req.query.name
  const videogamesTotal = await getAllVidegamesInfo();
    try {
    if (name){    // si se recibe nombre ///
        let videogameName = await videogamesTotal.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()));
        videogameName.length ?
        res.status(200).json(videogameName) :
        res.status(400).send('Ups sorry , no videogame with that name');
    } else {  /// si no se recibe nombre trae a todos ///
        res.status(200).json(videogamesTotal)
    }
} catch (error) {
    res.status(401).json({error: error.message})
}
    
};




///// busca el videogame por ID ////

const getVideogameId = async (req,res)=>{
 
  const  id  = req.params.id;
  
  try {
    const result = await getIdVideogame(id);
    
    if (result) {
      
      res.status(200).json(result);
    } else {
     res.status(404).send('Game not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
 }
};




//// agrega el videogame a la base de datos ////

const addVideogame = async (req, res) => {
    /// destructura la info recibida por body ////
    try {
        const {name, description, platforms, rating,background_image ,released , genres} = req.body
     
        if (!name ){
          
          return res.status(400).send('we missing info');
        } else {
          await createVideogame(name, description, platforms, rating,background_image ,released , genres);
          return res.status(201).send('Videogame created');
        }

    } catch (error) {
        res.status(500).json({error: error.message});
    }


};


module.exports = {
    getNameVideogame,
    //getVideogame,
    getVideogameId,
    addVideogame
}