import { Routes, Route } from "react-router-dom";
import { MovieList, MovieDetail, PageNotFound } from "../pages";
import { MovieWatchList } from "../pages/MovieWatchList";
import { MovieSearch } from "../pages/MovieSearch";

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MovieList sort='bottom' title="Bottom Rated" />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movies/unpopular" element={<MovieList sort='unpopular' title="Unpopular" />} />
      <Route path="/movies/recent" element={<MovieList sort='now_playing' title="Recent" />} />
      <Route path="/movies/upcoming" element={<MovieList sort='upcoming' title="Upcomming" />} />
      <Route path="/movies/watchlist" element={<MovieWatchList title="My watchlist" />} />
      <Route path="/movies" element={<MovieSearch />} />
      <Route path="*" element={<PageNotFound  title="404" />} />
    </Routes>
  );
}
