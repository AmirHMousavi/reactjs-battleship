import React, { Component } from "react";
import { Table, Divider, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import ErrorMessage from "./ErrorMessage";
import {
  setShipLocation,
  resetBoard,
  changeMyTurnToPlay,
  reduceTheHealthOfTheShip
} from "../actions/AllActions";

/**
 * @classdesc GameBoard can be in two modes;
 * 1.Init mode where players are placing their ships on the board.
 * 2.Battle mode where players are shooting on each others boards.
 * this class is rendered as child of @see GameInit and @see Battle
 * @todo The class has many functions, better to seperate them in an action file and import them here.
 */
class GameBoard extends Component {
  state = {
    columnsENUM: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    rowsENUM: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    error: {},
    mode: "",
    targetShots: [],
    lostShots: []
  };

  componentWillMount() {
    const { mode: receivedMode } = this.props;
    const { mode } = this.state;
    if (mode !== receivedMode) {
      this.setState({ mode: receivedMode });
    }
  }

  /**
   * when the game is in initialization mode this method handles clicks on the board
   * @param {number} rowNum
   * @param {string} colName
   */
  handleCellClickAtGameInit = (rowNum, colName) => {
    // destruct all needed values for ease
    const { players, playerNumber, setShipLocation: setLocation } = this.props;
    const { selectedShip, orientation } = players[playerNumber];
    const { size, key } = selectedShip;
    const { columnsENUM, rowsENUM, mode } = this.state;
    // get the index number of the column letter/name
    const colNum = columnsENUM.indexOf(colName);

    if (_.isEqual(mode, "InitMode")) {
      if (this.canPlaceItHere(rowNum, colName)) {
        const temp = [];
        if (orientation) {
          for (let i = 0; i < size; i += 1) {
            temp.push(rowNum + columnsENUM[colNum + i]);
          }
          setLocation(playerNumber, key, temp);
        }
        if (!orientation) {
          for (let i = 0; i < size; i += 1) {
            temp.push(rowsENUM[rowNum + i] + colName);
          }
          setLocation(playerNumber, key, temp);
        }
      } else {
        /** a general message for both not selected ship or the cells are occupide
         @todo: shif it to @function canPlaceItHere() with sepcific message */
        this.setState({
          error: {
            header: "BoardError!",
            body: "Either Ship is Not selected or Borad Cell Is Occupied"
          }
        });
        this.clrearError();
      }
    }
  };

  /**
   * when the game is in battle mode this method handles clicks on the board
   * @param {number} rowNum
   * @param {string} colName
   */
  handleCellClickAtBattle = (rowNum, colName) => {
    const {
      players,
      playerNumber,
      enemyNumber,
      changeMyTurnToPlay: cmttp,
      reduceTheHealthOfTheShip: rthots
    } = this.props;
    const { myTurnToPlay, username } = players[playerNumber];

    if (myTurnToPlay) {
      this.setState({
        error: {
          header: `It is ${username}'s turn to playe`,
          body: `Click On Enemy Board :)`
        }
      });
      this.clrearError();
    } else {
      // target shot
      if (this.isOccupied(rowNum, colName)) {
        const { targetShots: ts } = this.state;
        ts.push(rowNum + colName);
        this.setState({ targetShots: ts });
        const { ships } = players[playerNumber];
        const shotShip = ships.filter(ship =>
          ship.location.includes(rowNum + colName)
        );
        rthots(playerNumber, shotShip[0].key);
      }
      // lost shot
      else {
        const { lostShots: ls } = this.state;
        ls.push(rowNum + colName);
        this.setState({ lostShots: ls });
      }
      cmttp(playerNumber);
      cmttp(enemyNumber);
    }
  };

  /** Resets  ships[] Array in players state to its initial value (where the locations are empty)
   * @fires resetBoard
   */
  resetBoard() {
    const { resetBoard: resb, playerNumber } = this.props;
    resb(playerNumber);
  }

  /** a timeout that set error state to empty after 4 seconds
   * @fires setState
   */
  clrearError() {
    setTimeout(() => {
      this.setState({ error: {} });
    }, 4000);
  }

  /**
   * checks if given cell (rowNum+colName) is occupied
   * @param {number} rowNum
   * @param {string} colName
   */
  isOccupied(rowNum, colName) {
    const { players, playerNumber } = this.props;
    const { ships } = players[playerNumber];

    return ships.some(key => key.location.includes(rowNum + colName));
  }

  /**
   * cehcks if a ship can be placed at the given cell
   * by checking distance to borders of the board
   * and if the cells needed are already occupied
   * @fires isOccupied
   * @param {number} rowNum
   * @param {string} colName
   */
  canPlaceItHere(rowNum, colName) {
    const { players, playerNumber } = this.props;
    const { orientation, selectedShip } = players[playerNumber];
    const { size } = selectedShip;
    const { columnsENUM, rowsENUM } = this.state;
    const colNumFromName = columnsENUM.indexOf(colName);

    if (_.isEmpty(selectedShip)) return false;
    if (orientation) {
      if (size > columnsENUM.length - colNumFromName) return false;
      for (let index = 0; index < size; index += 1) {
        if (this.isOccupied(rowNum, columnsENUM[colNumFromName + index]))
          return false;
      }
    }
    if (!orientation) {
      if (size > rowsENUM.length - rowNum) return false;
      for (let index = 0; index < size; index += 1) {
        if (this.isOccupied(rowsENUM[rowNum + index], colName)) return false;
      }
    }
    return true;
  }

  render() {
    const {
      columnsENUM,
      rowsENUM,
      error,
      mode,
      lostShots,
      targetShots
    } = this.state;
    return (
      <div>
        <div>
          {/* ----- Rendering a 10x10 Table---------- */}
          <Table celled definition unstackable fixed>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell />
                {columnsENUM.map(colName => (
                  <Table.HeaderCell key={colName}>{colName}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            {/** should call the onClick as a function
             the cell passes rowNumber and columnnumber
             @see https://github.com/Semantic-Org/Semantic-UI-React/pull/829#issuecomment-416953761 */}
            <Table.Body>
              {rowsENUM.map(rowNum => (
                <Table.Row key={rowNum} textAlign="center" color="blue">
                  <Table.Cell key={rowNum}>{rowNum}</Table.Cell>
                  {columnsENUM.map(colName => {
                    if (_.isEqual(mode, "InitMode"))
                      return (
                        <Table.Cell
                          key={rowNum + colName}
                          selectable
                          onClick={() =>
                            this.handleCellClickAtGameInit(rowNum, colName)
                          }
                          bgcolor={
                            this.isOccupied(rowNum, colName)
                              ? "#331a00"
                              : "#b3e6ff"
                          }
                        />
                      );
                    if (_.isEqual(mode, "BattleMode")) {
                      let color = "";
                      if (lostShots.includes(rowNum + colName))
                        color = "#b3e6ff";
                      else if (targetShots.includes(rowNum + colName))
                        color = "red";
                      return (
                        <Table.Cell
                          key={rowNum + colName}
                          onClick={() =>
                            this.handleCellClickAtBattle(rowNum, colName)
                          }
                          bgcolor={color}
                        >
                          {rowNum + colName}
                        </Table.Cell>
                      );
                    }
                    return <div />;
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {/*------------------------------------*/}
          <Divider />
          {_.isEqual(mode, "InitMode") ? (
            <Button color="yellow" onClick={() => this.resetBoard()}>
              Reset Board
            </Button>
          ) : (
            <div />
          )}
        </div>
        <div>
          {!_.isEmpty(error) ? <ErrorMessage errorMessage={error} /> : <div />}
        </div>
      </div>
    );
  }
}

/** Find Actions in src/actions/AllActions  */
GameBoard.propTypes = {
  setShipLocation: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  resetBoard: PropTypes.func.isRequired,
  changeMyTurnToPlay: PropTypes.func.isRequired,
  reduceTheHealthOfTheShip: PropTypes.func.isRequired,
  // as players object is big, using 'shape' is inconvenient. disable ESLint here
  players: PropTypes.object.isRequired, // eslint-disable-line
  playerNumber: PropTypes.number.isRequired,
  enemyNumber: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(
  mapStateToProps,
  { setShipLocation, resetBoard, changeMyTurnToPlay, reduceTheHealthOfTheShip }
)(GameBoard);
