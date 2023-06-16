import axios from 'axios'
import {GET_VIDEOGAMES,GET_VIDEOGAME_DETAIL,CLEAR_DETAIL,GET_GENRES,ORDER_BY_ORIGIN,FILTER_BY,FILTER_BY_GENRES,ON_SEARCH,ORDER_BY,GET_PLATFORMS,CREATE_VIDEOGAME} from './actions-types'



///////// todos los videojuegos////
export const getGames = ()=>{
    return async function (dispatch){
        const response = await axios.get("http://localhost:3001/videogames");
        return dispatch({type:GET_VIDEOGAMES,
            payload:response.data})
    } 
};
//////// videojuegos por nombre

export const onSearch =(nameState)=>{
    return async function(dispatch){
        const {data} = await axios.get(`http://localhost:3001/videogames?name=${nameState}`)
        // console.log(data)
        return dispatch({
        type:ON_SEARCH,
        payload:data,
    }) 
    }       
    }

//// videojuegos por id details

export const getDetail = (videogame) => ({
    type: GET_VIDEOGAME_DETAIL,
    payload: videogame
  });
  
  export const getGamesId = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        const videogame = response.data;
  
        let obj;
        
        if (id.includes("-")) {
          obj = {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            img: videogame.img,
            released: videogame.released,
            rating: videogame.rating,
            platforms: videogame.platforms,
            genres: videogame.genres.map(e => e.name + " ,")
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


  export const getPlatforms =() =>{
    return async function (dispatch){
    const response = await axios.get('http://localhost:3001/platforms')
    const arrayObjetos = response.data.map((valor, indice) => {
      return { id: indice + 1, valor: valor };
    });
    return dispatch({
      type:GET_PLATFORMS,
       payload:arrayObjetos})
    }
  }



///// limpieza del estado al desmontarse


export const cleanDetail = ()=>{
    return {type:CLEAR_DETAIL}
}

//// todos los generos ///

export const getGenres = ()=>{
    return async function (dispatch){
        const response = await axios.get('http://localhost:3001/genres');

        return dispatch({
          type:GET_GENRES,
          payload:response.data})
    } 
}
 /// filtrado por generos ///
export const filterByGenres=(genres)=>{
    return{
        type:FILTER_BY_GENRES,
        payload:genres
    }
}
/// acomodo segun su origen
export const getSort =(order)=>{
    return {
        type:ORDER_BY_ORIGIN,
        payload:order
    }
}


/// filtro segun letra o rating

export const filterGames = (order)=> {
    return {
        type:FILTER_BY,
        payload:order
    }
}
// export const filterGames = async (orden,juegos)=>{
//     let games = await juegos;

//     switch(orden){
//         case 'AZ':
//             return games.sort((o1,o2)=>{
//                 if(o1.name < o2.name){
//                     return -1;
//                 }else if(o1.name > o2.name){
//                     return 1;
//                 }else{
//                     return 0;
//                 }
//             })
//         case 'ZA':
//             return games.sort((o1,o2)=>{
//                 if(o1.name > o2.name){
//                     return -1;
//                 }else if(o1.name < o2.name){
//                     return 1;
//                 }else{
//                     return 0;
//                 }
//             })
//         case 'BR':
//             return games.sort((o1,o2)=>{
//                 if(o1.rating < o2.rating){
//                     return -1;
//                 }else if(o1.rating > o2.rating){
//                     return 1;
//                 }else{
//                     return 0;
//                 }
//             })
       

        
            
//         default: break;
//     }
//     return {type:FILTER_BY,payload:games};   
// }

export function orderBy(params) {
    return { 
        type: ORDER_BY,
         payload: params };
  }


  export function CreateVideogame(payload) {
    return async function(dispatch) {
      const response = await axios.post('http://localhost:3001/videogames',payload)
    console.log(payload)
    return response;
    }
  }