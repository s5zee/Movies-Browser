import { all } from "redux-saga/effects";
import { watchFetchPopularMovies } from "./features/movies/popularMoviesSaga";
import { watchFetchPerson } from "./features/people/PersonPage/personSaga";
import { watchFetchPopularPeople } from "./features/people/popularPeopleSaga";
import { watchFetchMovieDetails } from "./features/movies/MoviePage/movieDetailsSaga";
import { watchFetchGenres } from "./common/tiles/MovieTile/Genre/genreSaga";

export default function* rootSaga() {
  yield all([
    watchFetchPopularMovies(),
    watchFetchPopularPeople(),
    watchFetchPerson(),
    watchFetchMovieDetails(),
    watchFetchGenres(),
  ]);
}
