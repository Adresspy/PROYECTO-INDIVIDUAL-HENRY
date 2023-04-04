import React from "react";
import "../Paginado/Paginado.css";

export default function Paginado({ gamesPerPage, allVideogames, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
    // lo que hara esta logica, es darnos el numero de paginas que tendremos en nuestro array
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers?.map((number) => {
          return (
            <li className="number">
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
