import { Card } from "./";
import PlaceholderSmall from "../assets/images/no-image-placeholder-transparent-small.png";
import { MovieCardInterface } from "../interfaces/movie.interface";

type MoviesProps = {
  items?: MovieCardInterface[] | null;
  loading?: boolean;
  error?: Error | null;
}

export function Movies({ items, loading, error }: MoviesProps = {}) {
  return (
    <section className="flex flex-wrap justify-center gap-4">
      {
        loading && <p className="text-3xl text-gray-700 dark:text-white">Loading</p>
      }
      {
        error && <p className="text-3xl text-gray-700 dark:text-white">Error: {error.message}</p>
      }
      {
        !loading && items && items.length > 0 && items.map((movie, index) => {
          return <Card
            key={index}
            id={movie.id}
            title={movie.title}
            description={movie.description ? movie.description : 'Pas de description, ça sent bon !'}
            image={movie.image ? `${process.env.REACT_APP_TMDB_IMAGE_URL}${movie.image}` : PlaceholderSmall}
            link={`/movie/${movie.id}`}
          />
        })
      }
    </section>
  );
}
