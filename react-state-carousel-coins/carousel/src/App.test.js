import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

it(`doesn't crash when rendering`, () => {
  render(<App/>);
});

it('matches snapshot', () => {
  const { asFragment } = render(<App/>);
  expect(asFragment()).toMatchSnapshot();
});