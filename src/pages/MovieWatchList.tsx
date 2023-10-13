import { MovieService } from "../services/Movie.service";
import { useTitle } from "../hooks";
import { Movies } from "../components/Movies";

type MovieWatchListProps = {
  title?: string;
}

export function MovieWatchList({ title }: MovieWatchListProps = {}) {
  useTitle(title);

  const movies = MovieService.useGetWatchlist();

  return (
    <main>
      <Movies items={movies} loading={false} error={null} />
    </main>
  );
}
