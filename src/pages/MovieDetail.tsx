import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { MovieService } from "../services/Movie.service";
import NoImagePlaceholder from "../assets/images/no-image-placeholder-transparent.png";
import { Button, ImdbButton } from "../components";
import { useTitle } from "../hooks";

type MovieDetailProps = {
  title?: string;
}

export function MovieDetail({ title = '' }: MovieDetailProps) {
  const params = useParams();
  const [movieId] = useState(params.id);
  const movie = MovieService.useGetById(movieId)

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
            {
              movie.data?.imdb_id && <ImdbButton imdbId={movie.data?.imdb_id} />
            }
            <p className="font-normal text-justify md:text-lg">
              {movie.data?.overview}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
