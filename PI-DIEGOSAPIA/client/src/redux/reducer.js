import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  CLEAR_DETAIL,
  ORDER_BY,
  FILTER_BY_ORIGIN,
  GET_GENRES,
  FILTER_BY_GENRES,
  ORDER_BY_RATING,
  ON_SEARCH,
  GET_PLATFORMS,
  CREATE_VIDEOGAME,
} from "./actions-types";

const initialState = {
  videogames: [],
  gamescopy: [],
  filtered: [],
  detail: {},
  genres: [],
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        gamescopy: action.payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: [...action.payload],
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case CREATE_VIDEOGAME:
      return {
        ...state,
        videogames:  [...state.videogames, action.payload],
      };

    case CLEAR_DETAIL:
      return {
        ...state,
       
        
        detail: {},
        genres: [],
        platforms: [],
      };

    case FILTER_BY_ORIGIN:
      let videogamesFilterOrigin = [...state.gamescopy];

      if (action.payload === "bd") {
        videogamesFilterOrigin = videogamesFilterOrigin.filter(
          (game) => game.createdBd
        );
      } else if (action.payload === "api") {
        videogamesFilterOrigin = videogamesFilterOrigin.filter(
          (game) => !game.createdBd
        );
      } else if (action.payload === "All") {
        videogamesFilterOrigin = [...state.videogames];
      } else {
        window.alert("No hay coincidencias");
      }

      return {
        ...state,
        filtered: videogamesFilterOrigin,
      };


    case ON_SEARCH:
      try {
        return {
          ...state,
          videogames: [...action.payload],
          filtered: [...action.payload]
        };
      } catch (error) {
        throw new Error("Personaje no enontrado");
      }

    case ORDER_BY:
      let videogamesFilteredCopy = [...state.filtered];
      let allVideogamesCopy = [...state.videogames];
      let videogamesSort;

      if (videogamesFilteredCopy.length > 0) {
        videogamesSort = videogamesFilteredCopy.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        videogamesSort = allVideogamesCopy.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (action.payload === "Original") {
        videogamesSort = videogamesFilteredCopy
      }
      if (action.payload === "D") {
        videogamesSort.reverse();
      } else if (action.payload === "A") {
        videogamesSort = initialState.videogames;
      }

      return {
        ...state,
        filtered: videogamesSort,
      };

    case ORDER_BY_RATING:
      let videogamesRating = [...state.filtered];
      let allVideogamesRating = [...state.videogames];
      let videogamesSortRating;

      if (videogamesRating.length > 0) {
        videogamesSortRating = videogamesRating.sort(
          (a, b) => b.rating - a.rating
        );
      } else {
        videogamesSortRating = allVideogamesRating.sort(
          (a, b) => b.rating - a.rating
        );
      }

      if (action.payload === "SR") {
        videogamesSortRating.reverse();
      } else if (action.payload === "Original") {
        videogamesSortRating = initialState.videogames;
      }

      return {
        ...state,
        filtered: videogamesSortRating,
      };

    case FILTER_BY_GENRES:
      let videogameFilterGenre = [...state.filtered];

      if (videogameFilterGenre.length > 0) {
        videogameFilterGenre = videogameFilterGenre.filter((game) =>
          game.genres.includes(action.payload)
        );
      } else {
        videogameFilterGenre = state.videogames.filter((game) =>
          game.genres.includes(action.payload)
        );
      }

      if (action.payload === "All") {
        videogameFilterGenre = initialState.videogames;
      } else {
        if (
          videogameFilterGenre.length === 0 &&
          videogameFilterGenre.length !== "All"
        ) {
          window.alert("No hay coincidencias");
          videogameFilterGenre = [...state.filtered];
        }
      }
      return {
        ...state,
        filtered: videogameFilterGenre,

      };
    default:
      return { ...state };
  }
};

export default rootReducer;
