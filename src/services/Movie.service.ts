import { MovieInterface } from "../interfaces/movie.interface";
import { FetchGetResponse, useFetchGet } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { TMDBPaginatedInterface } from "../interfaces/tmdb.interface";

export namespace MovieService {
  export type defaultSort = 'now_playing' | 'unpopular' | 'bottom' | 'upcoming';
  export type GetFilter = AllOptional<MovieInterface> & { defaultSort?: defaultSort };

  export function useGet(filter?: GetFilter): FetchGetResponse<TMDBPaginatedInterface<MovieInterface>> {
    const [url, setUrl] = useState<URL | string | null>(null);
    const response = useFetchGet<TMDBPaginatedInterface<MovieInterface>>(url);

    useEffect(() => {
      const newUrl = new URL(`${process.env.REACT_APP_TMDB_API_URL || ""}/discover/movie`);
      newUrl.searchParams.append('api_key', process.env.REACT_APP_TMDB_API_KEY || "");
      newUrl.searchParams.append('language', "fr-FR");
      newUrl.searchParams.append('include_video', "false");
      if (filter?.adult) {
        newUrl.searchParams.append('include_adult', "true");
      }
      else {
        newUrl.searchParams.append('include_adult', "false");
      }
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
          maxDate.setDate(maxDate.getDate() + (7*3));
          newUrl.searchParams.append('sort_by', "popularity.asc");
          newUrl.searchParams.append('with_release_type', "2|3");
          newUrl.searchParams.append('release_date.gte', minDate.toISOString().split('T')[0]);
          newUrl.searchParams.append('release_date.lte', maxDate.toISOString().split('T')[0]);
          break;
        case 'now_playing':
        default:
          maxDate = new Date();
          minDate = new Date();
          minDate.setDate(minDate.getDate() - (7*3));
          newUrl.searchParams.append('sort_by', "popularity.asc");
          newUrl.searchParams.append('with_release_type', "2|3");
          newUrl.searchParams.append('release_date.gte', minDate.toISOString().split('T')[0]);
          newUrl.searchParams.append('release_date.lte', maxDate.toISOString().split('T')[0]);
          break;
      }
      setUrl(newUrl);
    }, [filter]);

    return response;
  }
}