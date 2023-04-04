import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/Actions/";
import styles from "./Detail.module.css";
export default function Detail(props) {
  console.log(props);
  var regex = /(<([^#$>]+)>)/gi; // ayuda a traer la description
  const myVideogame = useSelector(state => state.gameDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    if (myVideogame.length) {
      return (
        <div>
          <p>cargando...</p>
        </div>
      );
    }
  }, [dispatch, props.match.params.id, myVideogame]);

  return (
    <div className={styles.container}>
      {myVideogame.length > 0 ? (
        <div>
          <h1>Name: {myVideogame[0].name}</h1>
          <img
            src={myVideogame[0].img}
            alt={myVideogame[0].name}
            className={styles.image}
          />
          <div className="description">
            <p>
              Descripción:
              {myVideogame[0].description
                ?.replace(regex, " ")
                .replace(" ", " ")}
            </p>
          </div>
          <h2>Genres: {myVideogame[0].genres}</h2>
          <h3>Rating: {myVideogame[0].rating}</h3>
          <h3>Relesed: {myVideogame[0].released}</h3>
          <h2>Plataforms: {myVideogame[0].platforms}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
