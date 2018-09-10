import update from "immutability-helper";
import * as types from "../actions/types";
import player from "../assets/PlayerModel";

const emptyState = {};
const newPlayer = player;

export default function(state, action) {
  if (typeof state === "undefined") {
    return emptyState;
  }
  switch (action.type) {
    case types.PLAYER_NEW_PLAYER: {
      // action.payload = new palyer object with empty attrs
      // set a new id number which is object number in state.
      const count = Object.keys(state).length;
      const payload = update(newPlayer, { id: { $set: count + 1 } });
      return { ...state, [payload.id]: payload };
    }

    case types.PLAYER_CHANGE_ORIENTATION: {
      const { orientation } = state[action.id];
      return update(state, {
        [action.id]: {
          orientation: { $set: !orientation }
        }
      });
    }

    case types.PLAYER_USERNAME: {
      return update(state, {
        [action.id]: { username: { $set: action.payload } }
      });
    }

    case types.PLAYER_SELECTED_SHIP: {
      return update(state, {
        [action.id]: { selectedShip: { $set: action.payload } }
      });
    }

    case types.SET_SHIP_LOCATION: {
      const { disabled } = state[action.id].ships[action.key];
      return update(state, {
        [action.id]: {
          ships: {
            [action.key]: {
              location: { $set: action.payload },
              disabled: { $set: !disabled }
            }
          },
          selectedShip: { $set: {} }
        }
      });
    }

    case types.RESET_BOARD: {
      const { ships } = newPlayer;
      return update(state, {
        [action.id]: { ships: { $set: ships }, selectedShip: { $set: {} } }
      });
    }

    case types.TURN_OF_PLAY_CHANGED: {
      const { myTurnToPlay } = state[action.id];
      return update(state, {
        [action.id]: { myTurnToPlay: { $set: !myTurnToPlay } }
      });
    }

    case types.REDUCE_HEALTH_OF_SHIP: {
      const { health: h } = state[action.id].ships[action.key];
      return update(state, {
        [action.id]: {
          ships: {
            [action.key]: {
              health: { $set: h - 1 }
            }
          }
        }
      });
    }

    case types.PLAYER_UPDATE_DATA:
      return { ...state, [action.payload.id]: action.payload };

    case types.PLAYER_CANCELS_GAME:
      return emptyState;

    default:
      return state;
  }
}
