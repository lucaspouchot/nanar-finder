import { Link } from "react-router-dom";
import { getTextWidth } from "../utils";
import { Button } from "./Button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMovieToWatchlist, removeMovieFromWatchlist } from "../store/watchlist/watchListSlice";
import { MovieService } from "../services/Movie.service";
import { MovieCardInterface } from "../interfaces/movie.interface";

type CardProps = {
  link?: string;
} & MovieCardInterface;

export function Card(movie: CardProps) {
  const watchListMovies = MovieService.useGetWatchlist();
  const { id, title, description, image, smallImage, link } = movie;
  const [inWatchList, setInWatchList] = useState(watchListMovies?.some((item) => item.id === id));
  const dispatch = useDispatch()

  const handleWatchlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(inWatchList ? removeMovieFromWatchlist(movie.id) : addMovieToWatchlist(movie));
  }

  useEffect(() => {
    setInWatchList(watchListMovies?.some((item) => item.id === id));
  }, [watchListMovies, id]);

  return (
    <Link to={link ? link : '#'} className="group flex flex-row md:flex-col md:justify-between w-[90vw] md:w-80 items-center bg-white border border-gray-200 rounded shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:hover:bg-slate-950">
      { image
        ? <>
          {
            smallImage
              ? <>
                  <img className="md:hidden block object-cover rounded-l h-52 group-hover:contrast-125" src={smallImage} alt="" />
                  <img className="hidden md:block object-cover w-full h-auto rounded-none rounded-t group-hover:contrast-125" src={image} alt="" />
                </>
              : <img className="object-cover w-60 md:w-full rounded-l h-96 md:h-112 md:rounded-none md:rounded-t group-hover:contrast-125" src={image} alt="" />
          }
          </>
        : <></>
      }
      <span className="flex flex-col w-full h-full justify-between">
        {
          (title || description) ?
            <div className="flex flex-col md:justify-between p-4 leading-normal h-[344px] md:h-44 w-full">
              { title && <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white md:line-clamp-2">{title}</h5> }
              { description && <p className={`font-normal text-gray-700 text-justify dark:text-gray-400 md:max-h-24 overflow-y-clip ${getTextWidth(title) > 190 ? 'md:line-clamp-3' : 'md:line-clamp-4'}`}>{description}</p> }
            </div>
            : <span></span>
        }
        <Button className="w-full rounded-t-none rounded-b-sm" action={handleWatchlist} >{ inWatchList ? 'Remove from watchlist' : 'Add to watchlist' }</Button>
      </span>
    </Link>
  );
}
