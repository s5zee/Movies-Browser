import { call, delay, put, takeLatest } from "redux-saga/effects";
import { apiKey, baseUrl, language } from "../../ApiValue";
import { getApiDatabase } from "../../getApiDatabase";

import {
  fetchPopularMovies,
  fetchPopularMoviesError,
  fetchPopularMoviesSuccess,
} from "./popularMoviesSlice";

function* fetchPopularMoviesHandler() {
  try {
    yield delay(2000);
    const movies = yield call(
      getApiDatabase,
      `${baseUrl}/movie/popular${apiKey}${language}`
    );
    yield put(fetchPopularMoviesSuccess(movies));
  } catch (error) {
    yield put(fetchPopularMoviesError());
  }
}

export function* watchFetchPopularMovies() {
  yield takeLatest(fetchPopularMovies.type, fetchPopularMoviesHandler);
}
