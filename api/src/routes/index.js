const { Router } = require("express");
const express = require("express");
const gamesRouter = require("../routes/videogames");
const genresRouter = require("../routes/genres");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", gamesRouter);
router.use("/genres", genresRouter);

module.exports = router;
