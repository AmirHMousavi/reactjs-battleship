import { combineReducers } from "redux";
import AllReducers from "./AllReducers";

export default combineReducers({
  players: AllReducers
});
