import { useState, useEffect } from "react";
import FilmDetail from "./detail/FilmDetail";
import { Link } from "react-router";
import type { U } from "node_modules/react-router/dist/development/router-5iOvts3c.mjs";

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        if (!response.ok) {
          throw new Error("Failed to fetch films");
        }
        const data = await response.json();
        console.log(data);

        setFilms(data.results);
      } catch (error) {
        console.error("Error fetching films:", error);
        setFilms([]);
      }
    };
    fetchFilms();
  }, []);

  const getID = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }

  return (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Films</h2>
      {films.map((film: any) => (
        <Link to={`/films/${getID(film.url)}`} key={film.episode_id} >
            <div className="border p-4 mb-4">
                <h2 className="text-xl font-bold">{film.title}</h2>
                <p>Episode {film.episode_id}</p>
            </div>
        </Link>
      ))}
    </div>
  );
};

export default Films;
