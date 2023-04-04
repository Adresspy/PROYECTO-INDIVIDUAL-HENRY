import React from "react";
import styles from "./Card.module.css";

export default function Card({
  name,
  image,
  platforms,
  genres,
  rating,
  released,
}) {
  return (
    // <div className={style.cardsContainer}>
    //   <h2>Name: {name}</h2>
    //   <h2>Released: {released}</h2>
    //   <img src={image} alt="img not found" width="300px" height="200px" />
    //   <h3> Genrers: {genres}</h3>
    //   <h3>Platforms: {platforms}</h3>
    //   <h4>Rating: {rating}</h4>
    //   <br />
    // </div>
    <div className={styles.cardContainer}>
      <div className={styles.cardImgContainer}>
        <img src={image} alt={name} className={styles.gameImg} />
      </div>

      <div className={styles.titleContain}>
        <div className={styles.title}>{name}</div>
      </div>

      <div className={styles.genresContainer}>
        <div className={styles.genre}>{genres}</div>;
      </div>

      <div className={styles.platformsContainer}>
        <div className={styles.platforms}>{platforms}</div>
      </div>
      <div className={styles.rating}>Rating: {rating}</div>

      <div className={styles.releasedContainer}>
        <div className={styles.released}>{released}</div>
      </div>
    </div>
  );
}
