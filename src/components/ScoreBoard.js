import React, { Component } from "react";
import {
  Table,
  Container,
  Header,
  Image,
  Button,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";

class ScoreBoard extends Component {
  state = {};

  render() {
    const scores = JSON.parse(localStorage.getItem("BatltleShipScores"));
    return (
      <div>
        <Container textAlign="center">
          <Header> SCORE BOARD</Header>
          <Table color="blue" celled textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Player</Table.HeaderCell>
                <Table.HeaderCell>Wins</Table.HeaderCell>
                <Table.HeaderCell>Loses</Table.HeaderCell>
                <Table.HeaderCell>TotalGames</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Object.keys(scores).map(key => (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image src={avatar} rounded size="mini" />
                      <Header.Content>{scores[key].name}</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{scores[key].wins}</Table.Cell>
                  <Table.Cell>{scores[key].loses}</Table.Cell>
                  <Table.Cell>
                    {scores[key].wins + scores[key].loses}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Divider />
          <Button primary as={Link} to="/">
            Go To HomePage
          </Button>
        </Container>
      </div>
    );
  }
}

export default ScoreBoard;
