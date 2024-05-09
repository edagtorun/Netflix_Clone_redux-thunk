import { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { baseImgUrl } from "../constants";
import DetailDisplay from "../components/DetailDisplay";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ActorCard from "../components/ActorCard";
const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  //urlden filmin id'sini al
  const { id } = useParams();

  //api'den film detaylarini al
  useEffect(() => {
    const params = {
      append_to_response: "credits, videos",
    };
    api
      .get(`movie/${id}`, { params })
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {!movie ? (
        <Loader />
      ) : (
        <div>
          {/*UST ALAN */}
          <div className="relative h-[40vh]">
            <img
              className="object-cover w-full h-full"
              src={baseImgUrl + movie.backdrop_path}
            />
            <div className="absolute bg-black inset-0 grid place-items-center bg-opacity-50">
              <h2 className="text-3xl font-semibold"> {movie.title}</h2>
            </div>
          </div>
          {/*ORTA ALAN */}
          <div className="my-10 grid-cols-1 md:grid-cols-2">
            <div>
              <DetailDisplay title={"Categories"} data={movie.genres} />
              <DetailDisplay
                title={"Languages"}
                data={movie.spoken_languages}
              />
              <DetailDisplay
                title={"Production Companies"}
                data={movie.production_companies}
              />
              <DetailDisplay
                title={"Production Countries"}
                data={movie.production_countries}
              />
            </div>
            <div>
              <p>{movie.overview}</p>

              <p>
                <span>Budget:</span>
                <span className="text-green-500 ms-2">
                  ${millify(movie.budget)}
                </span>
              </p>

              <p>
                <span>Revenue:</span>
                <span className="text-green-500 ms-2">
                  ${millify(movie.revenue)}
                </span>
              </p>
            </div>
          </div>
          {/*ALT KISIM */}
          <div>
            <Splide
              options={{
                autoWidth: true,
                gap: "10px",
                pagination: false,
                lazyLoad: true,
              }}
            >
              {movie.credits.cast.map((actor, i) => (
                <SplideSlide>
                  <ActorCard actor={actor} key={i} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
