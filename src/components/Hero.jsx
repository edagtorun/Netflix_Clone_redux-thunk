import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Error from "./Error";
import { FaPlay } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { baseImgUrl } from "../constants";

const Hero = () => {
  const { isLoading, error, movies } = useSelector((store) => store.movies);

  //0-19 arasinda rastgele sayi uret
  const i = Math.floor(Math.random() * 20);

  //rastgele uretilen siradaki elemana eris
  const movie = movies[i];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  md:max-h-[400px] gap-5 mb-10">
      {!movie || isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        movie && (
          <>
            <div className="flex flex-col gap-6 items-center justify-center">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="text-start">{movie.overview}</p>
              <p>
                <span>IMBD:</span>
                <span className="text-yellow-400 ms-2 font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </p>

              <div className="flex gap-5 ">
                <button className="flex gap-2 bg-white text-black items-center rounded px-4 hover:bg-slate-400 py-2">
                  <FaPlay className="text-3xl" /> Play
                </button>
                <button className=" flex gap-2 px-4 items-center text-white bg-gray-700 rounded py-2 hover:bg-gray-500">
                  <FaPlus className="text-3xl" /> My List
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                className="my-4 object-contain rounded hero-img max-h-[300px]"
                src={baseImgUrl + movie.backdrop_path}
              />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Hero;
