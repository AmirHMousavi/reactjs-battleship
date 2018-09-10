import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";
import _ from "lodash";
import GameElements from "./GameElements";
import { createNewPlayer, cancelGame } from "../actions/AllActions";

class GameInit extends Component {
  whatNext = () => {
    const {
      players,
      createNewPlayer: createNewPlayerAlt,
      history
    } = this.props;
    const playerNumber = Object.keys(players).length;
    // if we already have 2 players, go to battle , else create new player
    if (playerNumber >= 2) {
      history.push("/Battle");
    } else {
      createNewPlayerAlt();
    }
  };

  cancel = () => {
    const { history, cancelGame: cg } = this.props;
    cg();
    history.push("/");
  };

  render() {
    const { players } = this.props;
    const playerNumber = Object.keys(players).length;
    if (!_.isEmpty(players))
      return (
        <div>
          <h2> Player {playerNumber} </h2>
          <Divider />
          <GameElements
            playerNumber={playerNumber}
            whatNext={this.whatNext}
            cancel={this.cancel}
          />
        </div>
      );
    return <div />;
  }
}

GameInit.propTypes = {
  createNewPlayer: PropTypes.func.isRequired,
  cancelGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  players: PropTypes.object.isRequired // eslint-disable-line
};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(
  mapStateToProps,
  { createNewPlayer, cancelGame }
)(GameInit);
