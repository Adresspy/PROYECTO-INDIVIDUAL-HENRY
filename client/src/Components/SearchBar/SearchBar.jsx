import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesName } from "../../Redux/Actions/index";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState("");

  const handleInputChange = e => {
    e.preventDefault();
    setSearchState(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(getVideogamesName(searchState));
    setSearchState("");
    setCurrentPage(1);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        className="inputSearch"
        value={searchState}
        placeholder="Buscar un juego"
        onChange={e => handleInputChange(e)}
      />
      <button
        className="botonSearch"
        type="submit"
        onClick={e => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
