const { Videogame, Genre } = require("../db.js");

const createGame = async (
  name,
  description,
  released,
  rating,
  img,
  Genres,
  platforms

) => {



  try {
    if (!name || !description || !platforms || !img) {
      // validacion
      throw "faltan datos para crear el juego";
    } else {
      const newGame = await Videogame.create({
        // si todo se cumple crea el game
        name,
        description,
        released,
        rating,
        img,
        Genres,
        platforms,
      });

      const newGenre = await Genre.findAll({
        //???
        where: {
          name: Genres,
        },
      });

      await newGame.addGenre(newGenre);

      // prettier-ignore

      return newGame
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  createGame,
};
