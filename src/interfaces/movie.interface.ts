export interface MovieInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  genres: { id: number, name: string }[];
  id: number;
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  runtime: number,
  imdb_id: string,
  budget: number,
  revenue: number,
}

export interface MovieCardInterface {
  id: number;
  title: string;
  description: string;
  image?: string;
  smallImage?: string;
}
