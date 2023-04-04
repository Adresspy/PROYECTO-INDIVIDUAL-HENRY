import axios from "axios";
import {
  GET_GENRES,
  GET_VIDEOGAMES,
  FILTER_BY_GENRES,
  FILTER_BY_ORDER,
  FILTER_CREATED,
  VIDEO_GAMES_NAME,
  GET_DETAIL
} from "./constants";

export function getVideoGames() {
  return async function (dispatch) {
    var response = await axios("http://localhost:3001/videogames"); // OJO CON LOS AWAIT
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var response = await axios("http://localhost:3001/genres"); // OJO CON LOS AWAIT
    return dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  };
}

export function postVgames(payload) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/videogames', payload)
    console.log(response)
    return response;
  }
}

export function filterByGenres(payload) {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
}

export function filterByOrder(payload) {
  return {
    type: FILTER_BY_ORDER,
    payload,
  };
}


export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function getVideogamesName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?name=${name}` // OJO CON LOS AWAIT
      );
      return dispatch({
        type: VIDEO_GAMES_NAME,
        payload: response.data,
      });
    } catch (error) {
      alert("ops. ese juego no existe");
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/videogames/${id}`)
      return dispatch({
        type: GET_DETAIL,
        payload: response.data
      })
    } catch (error) {
      return error
    }
  }
}