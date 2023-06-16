import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  GET_VIDEOGAME_DETAIL,
  CLEAR_DETAIL,
  FILTER_BY,
  ORDER_BY_ORIGIN,
  GET_GENRES,
  FILTER_BY_GENRES,
  ORDER_BY,
  ON_SEARCH,
  GET_PLATFORMS,
  CREATE_VIDEOGAME
} from "./actions-types";

const initialState = {
  videogames: [],
  gamescopy: [],
  filtered: [],
  detail: {},
  genres: [],
  platforms:[],
};

const rootReducer = (state = initialState, action) => {
 
 
 switch (action.type) {
    
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        gamescopy: action.payload,
      };


      case CREATE_VIDEOGAME:
        return {
          ...state,
          
        }
      
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

      case GET_PLATFORMS:
        return{
          ...state,
          platforms: [...action.payload]
        }

    case CLEAR_DETAIL:
      return {
        ...state,
        detail: {},
        genres: [],
      };

    case ORDER_BY_ORIGIN:

      if (action.payload === "bd") {
        return {
          ...state,
          videogames: state.gamescopy?.filter((one) => one.createdBd),
        };
      } else if (action.payload === "api") {
        return {
          ...state,
          videogames: state.gamescopy?.filter((one) => !one.createdBd),
        };
      } else {
        return {
          ...state,
          videogames: state.gamescopy,
        };
      }



    case ON_SEARCH:
     
       try {
       const response = action.payload
       

      return {
        ...state,
        videogames: [...action.payload],
      };
    } catch (error) {
       throw new Error("Personaje no enontrado")
     }


     case FILTER_BY:
      const allCopy = [...state.videogames];
      allCopy.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (action.payload === "A") {
          if (nameA < nameB) return -1; //a-b
          if (nameA > nameB) return 1; //b-a
          return 0;
        } else {
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        }
      });
      return {
        ...state,
        videogames: [...allCopy]

      }
    
        case ORDER_BY:
          
        const allRatings = [...state.videogames];
        allRatings.sort((a, b) => {
          const ratingA = a.rating;
          const ratingB = b.rating;
          if (action.payload === "SR") {
            if (ratingA < ratingB) return -1; //a-b
            if (ratingA > ratingB) return 1; //b-a
            return 0;
          } else {
            if (ratingA > ratingB) return -1;
            if (ratingA < ratingB) return 1;
            return 0;
          }
        });
        return {
          ...state,
          videogames: [...allRatings]
  
        }

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTER_BY_GENRES:
     
      const genre = action.payload;
      if (genre === "All") {
       
        return {
          ...state,
          videogames: [...state.gamescopy]
        }

      } else {
        const filteredVideogames = state.gamescopy.filter((video) => video.genres.includes(genre))
        //   const fil = video.genres.filter((na) => na.name === genre);
        //   if (fil.length) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
        return {
          ...state,
          videogames: [...filteredVideogames],
        };
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
