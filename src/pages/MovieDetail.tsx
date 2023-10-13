import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MovieService } from "../services/Movie.service";
import NoImagePlaceholder from "../assets/images/no-image-placeholder-transparent.png";
import { Button, ImdbButton } from "../components";
import { useTitle } from "../hooks";
import { currencyFormatter } from "../utils";
import { TmdbButton } from "../components/TmdbButton";
import { useDispatch } from "react-redux";
import { addMovieToWatchlist, removeMovieFromWatchlist } from "../store/watchlist/watchListSlice";

type MovieDetailProps = {
  title?: string;
}

export function MovieDetail({ title = '' }: MovieDetailProps) {
  const params = useParams();
  const [movieId] = useState(Number.parseInt(params.id || '0', 10));
  const watchListMovies = MovieService.useGetWatchlist();
  const movie = MovieService.useGetById(movieId)
  const [inWatchList, setInWatchList] = useState(watchListMovies?.some((movie) => movieId && movie.id === movieId));
  const dispatch = useDispatch()

  const handleWatchlist = () => {
    if (!movie.data) return;
    dispatch(inWatchList ? removeMovieFromWatchlist(movie.data.id) : addMovieToWatchlist({
      id: movie.data.id,
      title: movie.data.title,
      description: movie.data.overview,
      image: movie.data.poster_path,
    }));
  }

  useEffect(() => {
    setInWatchList(watchListMovies?.some((item) => movieId && item.id === movieId));
  }, [watchListMovies, movieId]);

  useTitle(movie.data?.title || title);

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) {
      if (minutes === 0) {
        return '';
      }
      return `${minutes}min`;
    }
    return `${hours}h${minutes > 0 ? ` ${minutes < 10 ? `0${minutes}` : minutes}min` : ''}`;
  }

  return (
    <div className="mt-0 mx-0 relative">
      { movie.data?.backdrop_path &&
          <div className="absolute top-0 left-0 z-10">
              <img src={`${process.env.REACT_APP_TMDB_LARGE_IMAGE_URL}${movie.data?.backdrop_path}`}
                   alt="cover"
                   className="w-screen rounded-b lg:rounded-b-4xl"/>
          </div>
      }
      <main className="mt-0 pt-8 z-30 relative">
        <Button to='/' className="ml-4 mb-8">Back to home</Button>
        <section className="flex flex-col min-[1000px]:flex-row max-w-screen-xl mx-4 items-center bg-white/70 border border-gray-200 rounded shadow dark:border-gray-700 dark:bg-slate-900/70">
          { movie.data?.poster_path
            ? <img src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${movie.data?.poster_path}`} alt="cover" className="w-full h-auto md:h-[750px] min-[1000px]:w-[500px] object-cover rounded-b min-[1000px]:rounded-l order-2 min-[1000px]:order-1 min-[1000px]:rounded-br-none"/>
            : <img src={NoImagePlaceholder} alt="cover" className="min-[1000px]:w-[500px] object-cover rounded-b min-[1000px]:rounded-l min-[1000px]:rounded-br-none"/>
          }
          <div className="flex flex-col justify-start p-4 gap-4 leading-normal w-full min-[1000px]:h-[750px] order-1 min-[1000px]:order-2 dark:text-white text-black text-shadow">
            <p className="font-bold text-justify text-3xl md:text-5xl">
              {movie.data?.title}
            </p>
            {
              (movie.data?.title !== movie.data?.original_title) &&
                <p className="font-bold text-justify text-lg md:text-3xl">
                  ({movie.data?.original_title})
                </p>
            }
            {
              // eslint-disable-next-line
              (movie.data?.genres?.length || 0 > 0) &&
                <p className="flex flex-wrap gap-2">
                  {
                    movie.data?.genres.map((genre, index) => {
                      return <span key={index} className="border border-black dark:border-white px-3 py-1 rounded text-gray-700 dark:text-white">{genre.name}</span>
                    })
                  }
                </p>
            }
            <span className="flex flex-wrap gap-3 md:gap-6">
            {
              (movie.data?.release_date) &&
                <p className="text-lg md:text-xl">
                  {new Date(movie.data?.release_date).toLocaleDateString()}
                </p>
            }
            {
              // eslint-disable-next-line
              (movie.data?.runtime || 0 > 0) &&
                <p className="text-lg md:text-xl">
                  {toHoursAndMinutes(movie.data?.runtime || 0)}
                </p>
            }
            </span>
            <span className="flex flex-wrap gap-x-4 gap-y-2">
              {
                movie.data?.imdb_id && <ImdbButton imdbId={movie.data?.imdb_id} />
              }
              {
                movieId && <TmdbButton tmdbId={movieId} />
              }
            </span>
            <p>
              <div className="mr-2 font-bold">Description:</div>
              <span className="font-normal text-justify md:text-lg">{movie.data?.overview ||  'No description provided' }</span>
            </p>

            <div className="flex items-center">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <p className="ml-2 text-gray-900 dark:text-white">{movie.data?.vote_average.toFixed(1)}/10</p>
              <span className="w-1 h-1 mx-3 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <span className="text-gray-900 dark:text-white">{movie.data?.vote_count} reviews</span>
            </div>

            <p>
              <span className="mr-2 font-bold">Budget:</span>
              <span>{movie.data?.budget ? currencyFormatter.format(movie.data?.budget) : '-'}</span>
            </p>

            <p>
              <span className="mr-2 font-bold">Revenue:</span>
              <span>{movie.data?.revenue ? currencyFormatter.format(movie.data?.revenue) : '-'}</span>
            </p>

            <Button action={handleWatchlist} >{ inWatchList ? 'Remove from watchlist' : 'Add to watchlist' }</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
