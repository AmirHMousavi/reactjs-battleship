import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { Grid, Header, Button, Icon, Message } from "semantic-ui-react";
import GameBoard from "./GameBoard";
import { changeMyTurnToPlay, cancelGame } from "../actions/AllActions";

class Battle extends Component {
  state = { gameOver: {} };

  componentWillMount() {
    const { players, changeMyTurnToPlay: cmttp } = this.props;
    // just to make sure it is no ones turn to play
    Object.keys(players).forEach(
      key => (players[key].myTurnToPlay ? cmttp(key) : {})
    );
    // now give player one right to play
    cmttp(1);
  }

  componentDidUpdate() {
    const { gameOver } = this.state;
    // player which all his ships hited, is the looser
    const looserPlayer = Number(this.getHitedShips()[0]);
    if (looserPlayer > 0) {
      let winerPlayer;
      if (looserPlayer === 1) {
        winerPlayer = 2;
      } else winerPlayer = 1;
      const go = { looser: looserPlayer, winner: winerPlayer };
      // check if gameOverState is changed from prevSate. avoid infinitLoop
      if (!_.isEqual(gameOver, go)) {
        this.setState({ gameOver: go }); // eslint-disable-line
      }
      this.addResultToscoreBoard();
    }
  }

  /**
   * checks which player has all ships with health of 0
   * @returns Object Key which indicates player number
   */
  getHitedShips = () => {
    const { players } = this.props;
    return Object.keys(players).filter(
      key => players[key].ships.filter(ship => ship.health <= 0).length >= 5
    );
  };

  /**
   * clear thestore state and redirect to HomePage
   */
  cancel = () => {
    const { history, cancelGame: cg } = this.props;
    cg();
    history.push("/");
  };

  addResultToscoreBoard() {
    const { players } = this.props;
    const { gameOver } = this.state;
    // during development first render was returing empty gameOver so lets put a condition here ;)
    if (!_.isEmpty(gameOver)) {
      const winerName = players[gameOver.winner].username;
      const looserName = players[gameOver.looser].username;
      const scores = JSON.parse(localStorage.getItem("BatltleShipScores"));
      if (Object.keys(scores).includes(winerName)) {
        scores[winerName].wins += 1;
      } else {
        scores[winerName] = { name: winerName, wins: 1, loses: 0 };
      }
      if (Object.keys(scores).includes(looserName)) {
        scores[looserName].loses += 1;
      } else {
        scores[looserName] = { name: looserName, wins: 0, loses: 1 };
      }
      localStorage.setItem("BatltleShipScores", JSON.stringify(scores));
    }
  }

  render() {
    const { players } = this.props;
    const { gameOver } = this.state;
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column stretched>
            <Header as="h3" textAlign="center" color="teal">
              {players[1].username}
              &acute;s Board
            </Header>
            <GameBoard playerNumber={1} enemyNumber={2} mode="BattleMode" />
          </Grid.Column>
          <Grid.Column stretched>
            <Header as="h3" textAlign="center" color="teal">
              {players[2].username}
              &acute;s Board
            </Header>
            <GameBoard playerNumber={2} enemyNumber={1} mode="BattleMode" />
          </Grid.Column>
        </Grid>
        <br />
        {_.isEmpty(gameOver) ? (
          <Button
            color="red"
            icon
            labelPosition="right"
            type="button"
            onClick={() => this.cancel()}
          >
            Exit Game
            <Icon name="left arrow" />
          </Button>
        ) : (
          <br />
        )}
        {!_.isEmpty(gameOver) ? (
          <div>
            <Message color="blue">
              <Message.Header>GAME OVER!</Message.Header>
              {players[gameOver.looser].username} Lost All The Ships,{" "}
              {players[gameOver.winner].username} Is The Winner
            </Message>
            <Button
              color="blue"
              icon
              labelPosition="right"
              type="button"
              onClick={() => this.cancel()}
            >
              Start a New Game
              <Icon name="left arrow" />
            </Button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

Battle.propTypes = {
  changeMyTurnToPlay: PropTypes.func.isRequired,
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
  { changeMyTurnToPlay, cancelGame }
)(Battle);
