import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import App from "../App";

test("Link renders correctly", () => {
  const wrapper = shallow(<App />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
