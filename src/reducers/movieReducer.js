import { movies } from "../movies";
import {
  NEXT_MOVIE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  PREV_MOVIE,
  FIRST_MOVIE,
} from "../actions/action";

const initialState = {
  movies: movies,
  sira: 0,
  favMovies: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_MOVIE:
      return { ...state, sira: state.sira + 1 };
    case FIRST_MOVIE:
      return { ...state, sira: initialState.sira };
    case PREV_MOVIE:
      return { ...state, sira: state.sira - 1 };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favMovies: state.favMovies.filter(
          (movie) => movie.id !== action.payload
        ),
        movies: [
          ...state.movies,
          state.favMovies.find((movie) => movie.id === action.payload),
        ],
      };
    case ADD_FAVORITE:
      let yenisira =
        state.sira === state.movies.length - 1 ? state.sira - 1 : state.sira;
      yenisira = yenisira < 0 ? 0 : yenisira;
      return {
        ...state,
        favMovies: [...state.favMovies, action.payload],
        movies: state.movies.filter((movie) => movie.id !== action.payload.id),
        sira: yenisira,
      };

    default:
      return state;
  }
};

export default reducer;
