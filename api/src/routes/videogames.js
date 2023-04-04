const express = require("express");
const { Videogame } = require("../db");
const { getGames, createGame, gameId } = require("../controllers/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const { name } = req.query; // si me pasan name por query
  const vgTotal = await getGames();

  if (name) {
    let vgName = await vgTotal.filter(e =>
      e.name.toLowerCase().includes(name.toLowerCase())
    ); //le mandamos include para hacer la busqueda mas globar ;)
    vgName.length
      ? res.status(200).send(vgName)
      : res.status(404).send("Videogame Not Found");
  } else {
    res.status(200).send(vgTotal);
  }
});
//
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Videogame.findByPk(id);
    await response.destroy(id);
    res.status(200).send("Eliminado con exito");
  } catch (error) {
    res.status(400).send("no se pudo eliminar el juego");
  }
});
//
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await gameId(id);

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send("No se encontro el juego");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});
//
router.post("/", async (req, res) => {
  const { name, description, released, rating, img, Genres, platforms } =
    req.body;

  try {
    const response = await createGame(
      name,
      description,
      released,
      rating,
      img,
      Genres,
      platforms
    );
    if (
      response.name &&
      response.description &&
      response.platforms &&
      response.img
    ) {
      return res.status(201).send(response);
    } else {
      throw "Faltan datos para crear el juego";
    }
  } catch (error) {
    return res.status(400).send(`Error: ${error}`);
  }
});

module.exports = router;
