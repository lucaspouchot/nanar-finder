import { MovieService } from "../services/Movie.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "../hooks";
import { Movies } from "../components/Movies";

type MovieListProps = {
  sort?: MovieService.defaultSort;
  title?: string;
}

export function MovieList({ sort, title }: MovieListProps = {}) {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    defaultSort: sort,
  });

  useTitle(title);

  useEffect(() => {
    setFilter({
      defaultSort: sort,
    });
  }, [sort, searchParams]);

  const movies = MovieService.useGet(filter);

  return (
    <main>
      <Movies
        items={
          movies.data?.results.map(item => ({
            id: item.id,
            title: item.title,
            description: item.overview,
            image: item.poster_path,
          }))
        }
        loading={movies.loading}
        error={movies.error}
      />
    </main>
  );
}
