import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import { createNewPlayer } from "../actions/AllActions";

export class HomePage extends React.Component {
  startGame = () => {
    const { createNewPlayer: cnp, history } = this.props;
    cnp();
    history.push("/GameInit");
  };

  render() {
    return (
      <div>
        <Container textAlign="center">
          <Button.Group vertical>
            <Button id="startgame" color="blue" onClick={this.startGame}>
              START GAME
            </Button>
            <br />
            <Button id="scoreboard" color="teal" as={Link} to="/ScoreBoard">
              SCORE BOARD
            </Button>
            <br />
            <Button id="gamerules" color="yellow" as={Link} to="/Rules">
              GAME RULES
            </Button>
          </Button.Group>
        </Container>
      </div>
    );
  }
}

HomePage.propTypes = {
  createNewPlayer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  null,
  { createNewPlayer }
)(HomePage);
