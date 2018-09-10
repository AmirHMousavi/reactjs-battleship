import React from "react";
import { Route } from "react-router-dom";
import { Container, Image } from "semantic-ui-react";
import banner from "./assets/banner.png";
import HomePage from "./components/HomePage";
import Rules from "./components/Rules";
import GameInit from "./components/GameInit";
import Battle from "./components/Battle";
import ScoreBoard from "./components/ScoreBoard";

const App = () => (
  <Container>
    <Image src={banner} alt="BATTLESHIP" centered size="medium" />
    <Route path="/" exact component={HomePage} />
    <Route path="/Rules" exact component={Rules} />
    <Route path="/ScoreBoard" exact component={ScoreBoard} />
    <Route path="/GameInit" exact component={GameInit} />
    <Route path="/Battle" exact component={Battle} />
  </Container>
);

export default App;
