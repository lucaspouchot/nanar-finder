import { Routes, Route } from "react-router-dom";
import { MovieList, MovieDetail, PageNotFound } from "../pages";

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movies/bottom" element={<MovieList sort='bottom' />} />
      <Route path="/movies/unpopular" element={<MovieList sort='unpopular' />} />
      <Route path="/movies/upcoming" element={<MovieList sort='upcoming' />} />
      <Route path="/movies" element={<MovieList sort='none' />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
