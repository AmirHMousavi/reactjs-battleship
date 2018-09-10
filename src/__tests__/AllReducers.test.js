/* eslint-disable */
import * as types from "../actions/types";
import AllReducers from "../reducers/AllReducers";
import player from "../assets/PlayerModel";
import update from "immutability-helper";

/**
 * Opening the Redux plugin for bowser, for every type the plugin provides test cases it self
 * therefore we just write two to check correctness of those test cases.
 */

test("should setup default values @@INIT", () => {
  let state;
  state = AllReducers(undefined, {});
  expect(state).toEqual({});
});

test("should create a new player object @PLAYER_NEW_PLAYER", () => {
  const newPlayer1 = update(player, { id: { $set: 1 } });
  const newPlayer2 = update(player, { id: { $set: 2 } });
  expect(AllReducers({}, { type: types.PLAYER_NEW_PLAYER })).toEqual({
    "1": newPlayer1
  });
  expect(
    AllReducers({ "1": newPlayer1 }, { type: types.PLAYER_NEW_PLAYER })
  ).toEqual({
    "1": newPlayer1,
    "2": newPlayer2
  });
});
