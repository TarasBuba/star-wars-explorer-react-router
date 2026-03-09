import { useState, useEffect } from "react";
import { Link } from "react-router";
import Card from "~/components/Card";
// import MainLayout from "~/components/layout/MainLayout";
import useDetails from "~/hooks/useDetails";
import parseURL from "~/utils/parseURL";
import Loading from "~/components/Loading";
import Errors from "~/components/Errors";

interface Films {
  title: string;
  episode_id: number;
  url: string;
}

const Films = () => {

  const { data: films, loading, error } = useDetails<Films[] >({ resource: "films"})
  console.log(films);

  return (
    <>
      {loading ? <Loading /> : error ? <Errors message={error} /> :
        (

          <div className="p-4 bg-films min-h-screen text-amber-500">
            <h2 className="text-2xl font-bold mb-4 text-center">Films</h2>

            {films?.map((film: Films) => (
              <Link to={`/${parseURL(film.url).resource}/${parseURL(film.url).id}`} key={film.episode_id} >

                <Card heading={film.title} description={`Episode ${film.episode_id} `} />

              </Link>
            ))}
          </div>

        )}
    </>


  );
};

export default Films;
