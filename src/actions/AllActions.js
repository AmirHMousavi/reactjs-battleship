import * as types from "./types";

/**
 *
 */
export const createNewPlayer = () => ({ type: types.PLAYER_NEW_PLAYER });

export const nameInputOnChange = (ID, username) => ({
  type: types.PLAYER_USERNAME,
  id: ID,
  payload: username
});

export const changeOrientation = ID => ({
  type: types.PLAYER_CHANGE_ORIENTATION,
  id: ID
});

export const shipSelected = (ID, selectedShip) => ({
  type: types.PLAYER_SELECTED_SHIP,
  id: ID,
  payload: selectedShip
});

export const setShipLocation = (ID, theKey, locationArray) => ({
  type: types.SET_SHIP_LOCATION,
  id: ID,
  key: theKey,
  payload: locationArray
});

export const resetBoard = ID => ({ type: types.RESET_BOARD, id: ID });

export const cancelGame = () => {
  localStorage.removeItem("BattleShipState");
  return { type: types.PLAYER_CANCELS_GAME };
};

export const reduceTheHealthOfTheShip = (ID, theKey) => ({
  type: types.REDUCE_HEALTH_OF_SHIP,
  id: ID,
  key: theKey
});

export const changeMyTurnToPlay = ID => ({
  type: types.TURN_OF_PLAY_CHANGED,
  id: ID
});
