// import { schema } from "normalizr";
/** TODO: (for fun:) new schema.Entity/Object to make model as an database ready entity */

const player = {
  id: null,
  username: "",
  myTurnToPlay: false,
  orientation: true,
  selectedShip: {},
  ships: [
    {
      key: 0,
      text: "Carrier size:5",
      value: 0,
      size: 5,
      health: 5,
      location: [],
      disabled: false
    },
    {
      key: 1,
      text: "Battleship size:4",
      value: 1,
      size: 4,
      health: 4,
      location: [],
      disabled: false
    },
    {
      key: 2,
      text: "Cruiser size:3",
      value: 2,
      size: 3,
      health: 3,
      location: [],
      disabled: false
    },
    {
      key: 3,
      text: "Submarine size:3",
      value: 3,
      size: 3,
      health: 3,
      location: [],
      disabled: false
    },
    {
      key: 4,
      text: "Destroyer size:2",
      value: 4,
      size: 2,
      health: 2,
      location: [],
      disabled: false
    }
  ]
};

export default player;
