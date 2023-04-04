require("dotenv").config();
const fetch = require("cross-fetch");
const { API_KEY } = process.env;
const { Videogame } = require('../db');
const gameId = async id => {
  // esta funcion recibe un id
  try {
    if (id) {


      // si el id es un numero hacemos la peticion con el id a nuestra api
      const responseApi = await fetch("https://api.rawg.io/api/games/" + id + "?key=" + API_KEY)
        .then(response => response.json())
        .then(data => data);

      const gameApiInfo = [{
        id: responseApi.id,
        img: responseApi.background_image,
        name: responseApi.name,
        genres: responseApi.genres.map(g => g.name).join(", "),
        description: responseApi.description, //creamos nuestro obj con la info de la api
        released: responseApi.released,
        rating: responseApi.rating,
        platforms: responseApi.platforms.map(p => p.platform.name).join(", "),
      }]

      return gameApiInfo;
    } else {
      const game = await Videogame.findByPk(id, {
        include: [{
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }]
      })
      return game

    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  gameId,
};
