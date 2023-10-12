import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { MovieService } from "../services/Movie.service";
import NoImagePlaceholder from "../assets/images/no-image-placeholder-transparent.png";
import { Button } from "../components";

export function MovieDetail() {
  const params = useParams();
  const [movieId] = useState(params.id);
  const movie = MovieService.useGetById(movieId)

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
        <section className="flex flex-col md:flex-row max-w-screen-xl mx-4 items-center bg-white/70 border border-gray-200 rounded shadow dark:border-gray-700 dark:bg-slate-900/70">
          { movie.data?.poster_path
            ? <img src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${movie.data?.poster_path}`} alt="cover" className="w-full h-auto md:w-[500px] object-cover rounded-b md:rounded-l order-2 md:order-1"/>
            : <img src={NoImagePlaceholder} alt="cover" className="md:w-[500px] object-cover rounded-b md:rounded-l"/>
          }
          <div className="flex flex-col justify-between p-4 leading-normal w-full order-1 md:order-2">
            <p className="font-normal text-gray-900 text-justify dark:text-white">
              {movie.data?.overview}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
