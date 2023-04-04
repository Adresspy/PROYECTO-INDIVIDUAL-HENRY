require("dotenv").config();
const { API_KEY } = process.env;
const fetch = require("cross-fetch");
const { Videogame, Genre } = require("../db.js");

const getGenres = async () => {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/genres?key=" + API_KEY // hacemos peticion a los generos
    )
      .then((response) => response.json())
      .then((data) => data);

    const genresApi = await response.results.map((e) => e.name); //mapeamos el name de cada genero
    // por que no traemos un id? por que ya especificamos en el modelo que tendria un UUIDV4

    genresApi.map((e) =>
      Genre.findOrCreate({
        //buscamos si ya existe, si no lo creamos
        where: { name: e },
      })
    );

    const allGenres = await Genre.findAll(); //traemos todos los generos de nuestro modelo Genre

    return allGenres;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getGenres,
};
