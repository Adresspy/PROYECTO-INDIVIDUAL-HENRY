const { createGame } = require("./createGame");
const { getGames, apiGames, GamesDb } = require("./getAllGames");
const { gameId } = require("./getGameId");
const { getGenres } = require("./getGenres");

module.exports = controllers = {
  createGame,
  getGames,
  gameId,
  getGenres,
  apiGames,
  getGames,
};
