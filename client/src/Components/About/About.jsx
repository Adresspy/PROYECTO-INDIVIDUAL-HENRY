import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import image from "../../Utils/about.png";
export default function About() {
  return (
    <div>
      <header>
        <div>
          <h1>logo</h1>
        </div>
        <div>
          <button>volver</button>
        </div>
      </header>
      <div className={styles.contenedor}>
        <img src={image} alt="img" />
        <div className={styles.div2}>DESCRIPCION</div>
      </div>
      <footer>REDES SOCIALES</footer>
    </div>
  );
}
