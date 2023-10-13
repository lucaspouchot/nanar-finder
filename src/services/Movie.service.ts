import { MovieCardInterface, MovieInterface } from "../interfaces/movie.interface";
import { FetchGetResponse, useFetchGet } from "../hooks";
import { useEffect, useState } from "react";
import { TMDBPaginatedInterface } from "../interfaces/tmdb.interface";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export namespace MovieService {
  export type defaultSort = 'none' | 'now_playing' | 'unpopular' | 'bottom' | 'upcoming';
  export type GetFilter = AllOptional<MovieInterface> & { defaultSort?: defaultSort, search?: string };

  export function useGet(filter?: GetFilter): FetchGetResponse<TMDBPaginatedInterface<MovieInterface>> {
    const [url, setUrl] = useState<URL | string | null>(null);
    const response = useFetchGet<TMDBPaginatedInterface<MovieInterface>>(url);

    useEffect(() => {
      let newUrl = new URL(`${process.env.REACT_APP_TMDB_API_URL || ""}/discover/movie`);
      if (filter?.search) {
        newUrl = new URL(`${process.env.REACT_APP_TMDB_API_URL || ""}/search/movie`);
        newUrl.searchParams.append('query', filter.search);
      }
      newUrl.searchParams.append('api_key', process.env.REACT_APP_TMDB_API_KEY || "");
      newUrl.searchParams.append('language', "fr-FR");
      newUrl.searchParams.append('include_video', "false");
      if (filter?.adult) {
        newUrl.searchParams.append('include_adult', "true");
      }
      else {
        newUrl.searchParams.append('include_adult', "false");
      }
      if (filter?.defaultSort !== 'none') {
        let minDate: Date;
        let maxDate: Date;
        switch (filter?.defaultSort) {
          case 'unpopular':
            newUrl.searchParams.append('sort_by', "popularity.asc");
            break;
          case 'bottom':
            newUrl.searchParams.append('sort_by', "vote_average.asc");
            newUrl.searchParams.append('vote_count.gte', "20");
            break;
          case 'upcoming':
            maxDate = new Date();
            minDate = new Date();
            maxDate.setDate(maxDate.getDate() + (7 * 3));
            newUrl.searchParams.append('sort_by', "popularity.asc");
            newUrl.searchParams.append('with_release_type', "2|3");
            newUrl.searchParams.append('release_date.gte', minDate.toISOString().split('T')[0]);
            newUrl.searchParams.append('release_date.lte', maxDate.toISOString().split('T')[0]);
            break;
          case 'now_playing':
          default:
            maxDate = new Date();
            minDate = new Date();
            minDate.setDate(minDate.getDate() - (7 * 3));
            newUrl.searchParams.append('sort_by', "popularity.asc");
            newUrl.searchParams.append('with_release_type', "2|3");
            newUrl.searchParams.append('release_date.gte', minDate.toISOString().split('T')[0]);
            newUrl.searchParams.append('release_date.lte', maxDate.toISOString().split('T')[0]);
            break;
        }
      }
      setUrl(newUrl);
    }, [filter]);

    return response;
  }

  export function useGetById(id?: string | number): FetchGetResponse<MovieInterface> {
    const [url, setUrl] = useState<URL | string | null>(null);
    const response = useFetchGet<MovieInterface>(url);

    useEffect(() => {
      let newUrl = new URL(`${process.env.REACT_APP_TMDB_API_URL || ""}/movie/${id}`);
      newUrl.searchParams.append('api_key', process.env.REACT_APP_TMDB_API_KEY || "");
      newUrl.searchParams.append('language', "fr-FR");
      setUrl(newUrl);
    }, [id]);

    return response;
  }

  export function useGetWatchlist(): MovieCardInterface[] {
    return useSelector((state: RootState) => state.watchListState)
  }
}
