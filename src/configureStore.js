/** loads state form local storage with key:BattleShipState  */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("BattleShipState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * saves state into local storage with key:BattleShipState
 * @param {*} state
 */
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("BattleShipState", serializedState);
  } catch (err) {
    // ignore for now
  }
};
