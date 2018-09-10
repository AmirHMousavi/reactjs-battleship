/* eslint-disable */
import * as actions from "../actions/AllActions";
import * as types from "../actions/types";

test("should retunr PLAYER_NEW_PLAYER", () => {
  const action = actions.createNewPlayer();
  expect(action).toEqual({ type: types.PLAYER_NEW_PLAYER });
});

test("should return PLAYER_USERNAME and recieve Number, String", () => {
  const action = actions.nameInputOnChange(1, "a");
  expect(action).toEqual({
    type: types.PLAYER_USERNAME,
    id: expect.any(Number),
    payload: expect.any(String)
  });
});

test("should return PLAYER_CHANGE_ORIENTATION", () => {
  const action = actions.changeOrientation(1);
  expect(action).toEqual({
    type: types.PLAYER_CHANGE_ORIENTATION,
    id: expect.any(Number)
  });
});

test("should return PLAYER_SELECTED_SHIP, recieve id,ship object", () => {
  const shipObjSample = {
    key: expect.any(Number),
    text: expect.any(String),
    value: expect.any(Number),
    size: expect.any(Number),
    health: expect.any(Number),
    location: expect.any(Array),
    disabled: expect.any(Boolean)
  };
  const action = actions.shipSelected(1, shipObjSample);
  expect(action).toEqual({
    type: types.PLAYER_SELECTED_SHIP,
    id: expect.any(Number),
    payload: shipObjSample
  });
});

/**
 * the localStorage of test scope is differ from window localStorage
 * test on jsdom and node but no diffrence Q in Stackoverflow now result.
 * followed the @see https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#srcsetuptestsjs-1
 * but nothing
 */
test("Player cancels game", () => {
  localStorage.setItem("BattleShipState", "test");
  const action = actions.cancelGame();
  expect(action).toEqual({
    type: types.PLAYER_CANCELS_GAME
  });
  expect(localStorage.getItem("BattleShipState")).toBeUndefined();
});

test("should reduce the health of hited ship, recieves id,ship object key in array", () => {
  const action = actions.reduceTheHealthOfTheShip(1, 1);
  expect(action).toEqual({
    type: types.REDUCE_HEALTH_OF_SHIP,
    id: expect.any(Number),
    key: expect.any(Number)
  });
});

test("should reset the board of an specific playerID", () => {
  const action = actions.resetBoard(1);
  expect(action).toEqual({
    type: types.RESET_BOARD,
    id: expect.any(Number)
  });
});

test("should set the location of a ship, recieveing ID, ship key, and location array", () => {
  const location = ["0A", "0B", "0C"];
  const action = actions.setShipLocation(1, 0, location);
  expect(action).toEqual({
    type: types.SET_SHIP_LOCATION,
    id: 1,
    key: 0,
    payload: location
  });
});
