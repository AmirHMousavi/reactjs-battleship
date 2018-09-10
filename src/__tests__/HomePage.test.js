/* eslint-disable */
import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { HomePage } from "../components/HomePage";

let createNewPlayer, history, wrapper;

beforeEach(() => {
  createNewPlayer = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <HomePage createNewPlayer={createNewPlayer} history={history} />
  );
});

test("should render the HomePage Component", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("#startgame").prop("onClick")();
  expect(history.push).toHaveBeenLastCalledWith("/GameInit");
});
