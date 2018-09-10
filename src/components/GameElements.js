import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Form,
  FormField,
  Dropdown,
  Button,
  Icon,
  Grid
} from "semantic-ui-react";
import _ from "lodash";
import {
  changeOrientation,
  nameInputOnChange,
  shipSelected,
  cancelGame
} from "../actions/AllActions";
import GameBoard from "./GameBoard";
import ErrorMessage from "./ErrorMessage";

export class GameElements extends Component {
  state = { errors: {} };

  onSubmit = () => {
    const { whatNext } = this.props;
    const errors = this.validate();
    if (!_.isEmpty(errors)) {
      /** @see https://github.com/jaredpalmer/formik/issues/772 */
      this.setState({ errors });
      setTimeout(() => {
        this.setState({ errors: {} });
      }, 4000);
    }
    if (Object.keys(errors).length === 0) {
      whatNext();
    }
  };

  validate = () => {
    const { players, playerNumber } = this.props;
    const { username, ships } = players[playerNumber];
    const errors = {};
    if (_.isEmpty(username)) {
      errors.header = "FromError!";
      errors.body = "username can't be blank";
    }
    ships.forEach(ship => {
      if (_.isEmpty(ship.location)) {
        errors.header = "FromError!";
        errors.body = "All ships must be located";
      }
    });
    return errors;
  };

  render() {
    const {
      players,
      playerNumber,
      changeOrientation: co,
      nameInputOnChange: nameInputOnChangeAlt,
      shipSelected: shipSelectedAlt,
      cancel: cg
    } = this.props;
    const currentPlayer = players[playerNumber];
    const { username, ships, orientation } = currentPlayer;
    const { errors } = this.state;

    return (
      <Grid>
        <Grid.Column width={4}>
          <Form id="from" onSubmit={this.onSubmit}>
            {/** @todo check if username already exists  */}
            <Form.Field>
              <label htmlFor="username">
                username
                <input
                  id="username"
                  type="text"
                  placeholder="e.g. John"
                  value={username}
                  onChange={e =>
                    nameInputOnChangeAlt(playerNumber, e.target.value)
                  }
                />
              </label>
            </Form.Field>
            <FormField>
              <Button
                id="orientation"
                primary
                icon
                type="button"
                onClick={() => co(playerNumber)}
              >
                <Icon name="retweet" />
                &nbsp;
                {orientation ? "Horizental" : "Vertical"}
              </Button>
            </FormField>
            <FormField>
              <Dropdown
                id="selectedship"
                placeholder="Select Ship"
                options={ships}
                onChange={(e, { value }) =>
                  shipSelectedAlt(playerNumber, ships[value])
                }
                selection
                item
              />
            </FormField>
            <FormField>
              <Form.Group>
                <Button primary type="submit" icon labelPosition="right">
                  Save &amp; Next
                  <Icon name="right arrow" />
                </Button>
              </Form.Group>
            </FormField>

            <FormField>
              <Button
                color="red"
                icon
                labelPosition="right"
                type="button"
                onClick={() => cg()}
              >
                Cancel
                <Icon name="left arrow" />
              </Button>
            </FormField>
          </Form>
        </Grid.Column>
        <Grid.Column width={12}>
          {/* Here we call the board , game board has access to the store */}
          <GameBoard
            playerNumber={playerNumber}
            enemyNumber={-1}
            mode="InitMode"
          />
        </Grid.Column>
        {!_.isEmpty(errors) ? <ErrorMessage errorMessage={errors} /> : <div />}
      </Grid>
    );
  }
}

/** Find Actions in src/actions/PlayerActions  */
GameElements.propTypes = {
  changeOrientation: PropTypes.func.isRequired,
  nameInputOnChange: PropTypes.func.isRequired,
  shipSelected: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  whatNext: PropTypes.func.isRequired,
  players: PropTypes.object.isRequired, // eslint-disable-line
  playerNumber: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(
  mapStateToProps,
  {
    changeOrientation,
    nameInputOnChange,
    shipSelected,
    cancelGame
  }
)(GameElements);
