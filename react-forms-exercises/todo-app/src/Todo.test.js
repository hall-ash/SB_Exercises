import React from 'react';
import { render } from '@testing-library/react';
import Todo from './Todo';

test('renders without crashing', () => {
  render(<Todo />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<Todo />)
  expect(asFragment()).toMatchSnapshot();
});