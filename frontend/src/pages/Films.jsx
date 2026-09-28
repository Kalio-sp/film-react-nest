import { useEffect, useState } from "react";
import { getFilms } from "../api/films";

export default function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getFilms()
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Фильмы</h1>

      {films.map((film) => (
        <div key={film._id}>
          <h2>{film.title}</h2>

          <p>{film.about}</p>

          <p>Режиссёр: {film.director}</p>

          <p>Рейтинг: {film.rating}</p>

          <img src={`http://localhost:3000${film.posterImage}`} width="200" />
        </div>
      ))}
    </div>
  );
}
