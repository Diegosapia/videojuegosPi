import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  CLEAR_DETAIL,
  GET_GENRES,
  FILTER_BY_ORIGIN,
  ORDER_BY,
  FILTER_BY_GENRES,
  ON_SEARCH,
  ORDER_BY_RATING,
  GET_PLATFORMS,
  CREATE_VIDEOGAME,
} from "./actions-types";

///////// todos los videojuegos////

export const getGames = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    return dispatch({ type: GET_VIDEOGAMES, payload: response.data });
  };
};

//////// videojuegos por nombre

export const onSearch = (nameState) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames?name=${nameState}`
      );
      return dispatch({
        type: ON_SEARCH,
        payload: data,
       
      });
    } catch (error) {
      throw error;
    }
  };
};

//// videojuegos por id details

export const getDetail = (videogame) => ({
  type: GET_VIDEOGAME_DETAIL,
  payload: videogame,
});

export const getGamesId = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      const videogame = response.data;

      let obj;

      if (id.includes("-")) {
        obj = {
          id: videogame.id,
          name: videogame.name,
          description: videogame.description,
          background_image: videogame.background_image,
          released: videogame.released,
          rating: videogame.rating,
          platforms: videogame.platforms,
          genres: videogame.genres.map((e) => e.name + " ,"),
        };
      } else {
        obj = videogame;
      }

      dispatch(getDetail(obj));
    } catch (error) {
      // Manejar el error aquí
    }
  };
};


////////////////// get platforms

export const getPlatforms = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/platforms");
      const arrayObjetos = response.data.map((valor, indice) => {
        
        return { id: indice + 1, valor: valor };
      });
      return dispatch({
        type: GET_PLATFORMS,
        payload: arrayObjetos,
      });
    } catch (error) {
      throw error;
    }
  };
};

///// limpieza del estado al desmontarse

export const cleanDetail = () => {
  return { type: CLEAR_DETAIL };
};
//// todos los generos ///
export const getGenres = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};
/// filtrado por generos ///
export const filterByGenres = (genres) => {
  return {
    type: FILTER_BY_GENRES,
    payload: genres,
  };
};
/// acomodo segun su origen
export const filterOrigen = (order) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: order,
  };
};

/// filtro segun alfabeticamente a-z o z-a

export const filterGames = (order) => {
  return {
    type: ORDER_BY,
    payload: order,
  };
};

//// order por rating

export function orderBy(params) {
  return {
    type: ORDER_BY_RATING,
    payload: params,
  };
}
//// create videogame

export function CreateVideogame(payload) {
  
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames",
        payload
      );
      
      return dispatch({
        type: CREATE_VIDEOGAME,
        payload: response,
      });
    } catch (error) {
      // Aquí puedes manejar el error de acuerdo a tus necesidades
      alert(error.request.response);
    }
  };
}
