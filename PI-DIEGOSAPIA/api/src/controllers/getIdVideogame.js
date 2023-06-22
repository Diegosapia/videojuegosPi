const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");



/// http://localhost:3001/videogames/2344
//// Se declara una función asíncrona llamada getIdVideogame que reciben dos parámetros: id y origen.
const getIdVideogame = async (id, origen) => {
  /// Se verifica si el valor de origen es igual a 'api'
  if (origen === 'api' ) {
    /// Si es así, se realiza una solicitud GET a la API utilizando axios qye incluye id y la api key
    let resp = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    ///Se crea un objeto videogame que contiene propiedades con la información relevante 
    //// del videojuego obtenida de resp.data. 
    let videogame = {
           id: resp.data.id,
           name: resp.data.name,
           description: resp.data.description_raw,
           background_image: resp.data.background_image,
           released: resp.data.released,
          rating: resp.data.rating,
//// Los valores de platforms y genres se obtienen mediante el uso de métodos de arreglo
///  (map) para mapear y extraer la información específica.
        platforms: resp.data.platforms.map(p => p.platform.name),
          genres: resp.data.genres.map(e=> e.name),
        }
/// se devuelve el objeto videogame
        return videogame
  } else {
/// Búsqueda de información de un videojuego en la base de datos:
/// aca entraria que si origen no es igual a 'api' entra en este else.
    let encontrado = await Videogame.findByPk(id, {
//// se realiza una búsqueda en la base de datos utilizando 
/// el modelo Videogame y su método findByPk para encontrar un registro de videojuego por su id.
      include: [
        {
/// Se utiliza el objeto de opciones dentro del método findByPk 
/// para incluir el modelo Genre y sus atributos name en la consulta.
          model: Genre,
          attributes:["name"],
/// se especifica que no se requiere ninguna columna adicional de la tabla de relación
// mediante la propiedad through dentro del objeto de opciones.
          through:{
            attributes:[],
          },
        },
      ],
    });
// se devuelve el videogame encontrado
    return encontrado; 
   }
   
};
module.exports = {
  getIdVideogame,
};
