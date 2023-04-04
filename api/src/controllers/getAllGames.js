require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { API_KEY } = process.env;
const axios = require("axios");



const apiGames = async () => {
  let allInfo = [];

  for (let i = 1; i <= 5; i++) {
    let resApi = await axios.get(
      "https://api.rawg.io/api/games?page=" + i + "&key=" + API_KEY
    );

    allInfo = allInfo.concat(
      resApi.data.results.map(e => {
        return {
          id: e.id,
          name: e.name,
          img: e.background_image,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map(e => e.platform.name).join(", "), //le hago un mapeo a plataform por nombre y uno los elementos con el join. si no me trae demasiada info!!
          genres: e.genres.map(g => g.name).join(", "), // con los nombres de generos
        };
      })
    );
  }
  return allInfo; // aca devuelvo todo lo que le solicite arriba a la api
};


const GamesDb = async () => {
  const info = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return info
};

const getGames = async () => {
  let apiJuegos = await apiGames();
  let dbJuegos = await GamesDb();
  console.log(dbJuegos);
  const allGames = apiJuegos.concat(dbJuegos);



  return allGames;
};



module.exports = {
  apiGames,
  GamesDb,
  getGames,
};
