import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import popularMoviesReducer from "./features/movies/popularMoviesSlice";
import popularPeopleReducer from "./features/people/popularPeopleSlice";
import personReducer from "./features/people/PersonPage/personSlice";
import movieDetailsReducer from "./features/movies/MoviePage/movieDetailsSlice";
import genreReducer from "./common/tiles/MovieTile/Genre/genreSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    popularPeople: popularPeopleReducer,
    person: personReducer,
    movieDetails: movieDetailsReducer,
    genres: genreReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
