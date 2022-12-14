import { ContentContainer, ListTitle } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchPopularMovies,
  selectPopularMovies,
  selectPopularMoviesStatus,
  selectPopularMoviesTotalPages,
  selectPopularMoviesTotalResults,
} from "../popularMoviesSlice";
import { MovieTile } from "../../../common/tiles/MovieTile";
import { Loader } from "../../../common/states/Loader";
import { Error } from "../../../common/states/Error";
import useQueryParameter from "../../../useQueryParameter";
import { NoResult } from "../../../common/states/NoResult";
import { fetchGenres } from "../../../common/tiles/MovieTile/Genre/genreSlice";
import { Pagination } from "../../../common/Pagination";
import { Wrapper } from "../../../common/tiles/generisStyles/styled";

export const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectPopularMovies);
  const stateOfLoading = useSelector(selectPopularMoviesStatus);
  const query = useQueryParameter("search");
  const page = useQueryParameter("page");
  const totalPages = useSelector(selectPopularMoviesTotalPages);
  const totalResults = useSelector(selectPopularMoviesTotalResults);

  useEffect(() => {
    dispatch(fetchPopularMovies({ page, query }));
    dispatch(fetchGenres());
  }, [dispatch, page, query]);

  return (
    <>
      {stateOfLoading === "loading" ? (
        <Loader title="Loading..." />
      ) : stateOfLoading === "error" ? (
        <Error />
      ) : (
        <Wrapper>
          {!movies.length ? (
            <NoResult query={query} />
          ) : (
            <>
              <ListTitle>
                {query
                  ? `Search results for "${query}" (${totalResults})`
                  : "Popular movies"}
              </ListTitle>
              <ContentContainer>
                {movies.map(
                  ({
                    id,
                    title,
                    poster_path,
                    vote_average,
                    vote_count,
                    release_date,
                    genre_ids,
                  }) => (
                    <MovieTile
                      key={id}
                      genre_ids={genre_ids}
                      id={id}
                      poster_path={poster_path}
                      title={title}
                      release_date={release_date}
                      rating={vote_average}
                      votes={vote_count}
                    />
                  )
                )}
              </ContentContainer>
              <Pagination totalPages={totalPages} page={page} />
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};
