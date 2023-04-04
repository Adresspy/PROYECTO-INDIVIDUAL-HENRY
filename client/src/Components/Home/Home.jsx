import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  getVideoGames,
  getGenres,
  filterByGenres,
  filterByOrder,
  filterCreated,
} from "../../Redux/Actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";
//
export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector(state => state.listGames);
  const allGenres = useSelector(state => state.listGenres);

  const [currentPage, setCurrentPage] = useState(1); // pagina actual, set pagina actual
  const [gamesPerPage, setGamesPerPage] = useState(15); // cuantos personajes por pagina
  const indexOfLastGame = currentPage * gamesPerPage; // index del ultimo personaje, en un principio 14 contando la posicion 0
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentVideogame = allVideogames.slice(
    indexOfFirstGame,
    indexOfLastGame
  ); // esta constante separa nuestros personajes, dependiendo de la pagina actual
  const paginado = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    //para poder cargar previamente dat
    dispatch(getGenres());
    dispatch(getVideoGames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(e);
    dispatch(getVideoGames());
  }

  function handleFilterByGenre(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value));
  }

  function handleFilterByOrder(e) {
    e.preventDefault();
    dispatch(filterByOrder(e.target.value));
    setCurrentPage(1);
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={style.container}>
      <div>
        <h1>DRIPP</h1>
        <button
          onClick={e => {
            handleClick(e);
          }}>
          REINICIAR VIDEOGAMES
        </button>
      </div>
      <div>
        <Link to="/videogames">
          <button className={style.createBtn}>Crear Videogame</button>
        </Link>
      </div>
      <form id="genreFilter">
        <select
          className="genreFilters"
          onChange={handleFilterByGenre}
          defaultValue={"All"}>
          <option className="genreOptions" value="All">
            Todos los generos
          </option>
          {allGenres.map((genre, i) => {
            return (
              <option className="genreOptions" value={genre.name} key={i}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </form>
      <div>
        <div>
          <select id="ordersFilter" onChange={handleFilterByOrder}>
            <option value="normal">Normal</option>
            <option disabled>Ordenar por: </option>
            <option disabled>Nombre</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
            <option disabled>Rating</option>
            <option value="highR">Alto</option>
            <option value="lowR">Bajo</option>
          </select>
        </div>

        <div>
          <select className="filterCreated" onChange={handleFilterCreated}>
            <option value="All">Todos</option>
            <option value="createdInDb">Creados</option>
            <option value="api">Api</option>
          </select>
        </div>
      </div>
      <Paginado
        gamesPerPage={gamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />

      <SearchBar className={"searchBar"} setCurrentPage={setCurrentPage} />

      {currentVideogame?.map(e => {
        if (!e.createdInDb) {
          return (
            <div>
              <NavLink className={e.id} to={"/home/" + e.id}>
                <Card
                  name={e.name}
                  image={e.img}
                  rating={e.rating}
                  platforms={e.platforms}
                  genres={e.genres}
                  released={e.released}
                />
              </NavLink>
            </div>
          );
        } else {
          return (
            <div>
              <NavLink className={e.id} to={"/home/" + e.id}>
                <Card
                  name={e.name}
                  image={e.img}
                  rating={e.rating}
                  platforms={e.platforms.map(p => p).join(", ")}
                  genres={e.genres.map(g => g.name).join(", ")}
                  released={e.realesed}
                />
              </NavLink>
            </div>
          );
        }
      })}
    </div>
  );
}
