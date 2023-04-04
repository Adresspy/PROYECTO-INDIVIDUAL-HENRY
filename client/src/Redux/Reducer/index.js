import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_BY_GENRES,
  FILTER_BY_ORDER,
  FILTER_CREATED,
  VIDEO_GAMES_NAME,
  POST_VIDEOGAME,
  GET_DETAIL
} from "../Actions/constants";

const initialState = {
  listGames: [],
  videogamesF: [],
  listGenres: [],
  platforms: [],
  gameDetail: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        listGames: action.payload,
        videogamesF: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        listGenres: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        gameDetail: action.payload
      }
    case POST_VIDEOGAME:
      return {
        ...state
      }
    case VIDEO_GAMES_NAME:
      return {
        ...state,
        listGames: action.payload,
      };
    case FILTER_BY_GENRES:
      const gamesGenreFilter = state.videogamesF;
      const genresFilter =
        action.payload === "All"
          ? gamesGenreFilter
          : gamesGenreFilter.filter(game =>
            game.genres.includes(action.payload)
          );
      if (genresFilter.length === 0) {
        alert(`No existe el video juego con ese genero ${action.payload}`);
        return state;
      } else {
        return {
          ...state,
          listGames: genresFilter,
        };
      }
    case FILTER_BY_ORDER:
      let sortedArray;
      if (action.payload === "asc") {
        sortedArray = state.listGames.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "desc") {
        sortedArray = state.listGames.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "highR") {
        sortedArray = state.listGames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "lowR") {
        sortedArray = state.listGames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (b.rating > a.rating) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "normal") {
        sortedArray = state.listGames;
      }
      return {
        ...state,
        listGames: [...sortedArray],
      };

    case FILTER_CREATED:
      const gamesCreatedFilter = state.videogamesF;
      let createdFilter = action.payload === "createdInDb"
        ? gamesCreatedFilter.filter(game => game.createdInDb)
        : gamesCreatedFilter.filter(game => !game.createdInDb);
      return {
        ...state,
        listGames: action.payload === "All" ? gamesCreatedFilter : createdFilter, //FILTER 100%
      };


    default:
      return state;
  }
}
