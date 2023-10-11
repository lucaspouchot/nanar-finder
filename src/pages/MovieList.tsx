import { Card } from "../components";
import { MovieService } from "../services/Movie.service";
import { useState } from "react";
import Placeholder from "../assets/images/no-image-placeholder-transparent.png";
import PlaceholderSmall from "../assets/images/no-image-placeholder-transparent-small.png";

type MovieListProps = {
  sort?: MovieService.defaultSort;
}

export function MovieList({ sort = 'now_playing' }: MovieListProps = {}) {
  const [filter, setFilter] = useState({
    defaultSort: sort
  });
  const movies = MovieService.useGet(filter);

  return (
    <main>
      <button onClick={() => setFilter({defaultSort: 'now_playing'})}>Recent</button>
      <button onClick={() => setFilter({defaultSort: 'unpopular'})}>unpopular</button>
      <button onClick={() => setFilter({defaultSort: 'bottom'})}>Bottom Ratted</button>
      <button onClick={() => setFilter({defaultSort: 'upcoming'})}>Upcoming</button>
      <section className="flex flex-wrap justify-center gap-4">
        {
          movies.loading && <p>Loading</p>
        }
        {
          movies.error && <p>Error: {movies.error.message}</p>
        }
        {
          movies.data?.results.map((movie, index) => (
            <Card
              key={index}
              title={movie.title}
              description={movie.overview ? movie.overview : 'Pas de description, ça sent bon !'}
              image={movie.backdrop_path ? `${process.env.REACT_APP_TMDB_IMAGE_URL}${movie.backdrop_path}` : Placeholder}
              smallImage={movie.poster_path ? `${process.env.REACT_APP_TMDB_IMAGE_URL}${movie.poster_path}` : PlaceholderSmall}
              link={`/movie/${movie.id}`}
            />
          ))
        }
      </section>
    </main>
  );
}