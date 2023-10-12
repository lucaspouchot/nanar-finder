import { Card } from "../components";
import { MovieService } from "../services/Movie.service";
import { useEffect, useState } from "react";
import PlaceholderSmall from "../assets/images/no-image-placeholder-transparent-small.png";
import { useSearchParams } from "react-router-dom";

type MovieListProps = {
  sort?: MovieService.defaultSort;
}

export function MovieList({ sort }: MovieListProps = {}) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [filter, setFilter] = useState({
    defaultSort: sort,
    search,
  });

  useEffect(() => {
    setFilter({
      defaultSort: sort,
      search,
    });
  }, [sort, searchParams]);

  const movies = MovieService.useGet(filter);

  return (
    <main>
      {
        search &&
          <section className="pb-7 pl-2">
            <p className="text-3xl text-gray-700 dark:text-white">Result for : {search}</p>
          </section>
      }
      <section className="flex flex-wrap justify-center gap-4">
        {
          movies.loading && <p className="text-3xl text-gray-700 dark:text-white">Loading</p>
        }
        {
          movies.error && <p className="text-3xl text-gray-700 dark:text-white">Error: {movies.error.message}</p>
        }
        {
          !movies.loading && movies.data && movies.data.results.length > 0 && movies.data.results.map((movie, index) => {
            return <Card
              key={index}
              title={movie.title}
              description={movie.overview ? movie.overview : 'Pas de description, ça sent bon !'}
              image={movie.poster_path ? `${process.env.REACT_APP_TMDB_IMAGE_URL}${movie.poster_path}` : PlaceholderSmall}
              link={`/movie/${movie.id}`}
            />
          })
        }
      </section>
    </main>
  );
}
