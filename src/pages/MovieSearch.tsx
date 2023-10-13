import { MovieService } from "../services/Movie.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "../hooks";
import { Movies } from "../components/Movies";

export function MovieSearch() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [filter, setFilter] = useState({
    search,
  });

  useTitle(search);

  useEffect(() => {
    setFilter({
      search,
    });
  }, [search, searchParams]);

  const movies = MovieService.useGet(filter);

  return (
    <main>
      {
        search &&
          <section className="pb-7 justify-center text-center">
            <p className="text-3xl text-gray-700 dark:text-white">Result for : {search}</p>
          </section>
      }
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
