import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BoxList from './BoxList';

// add red box of height 300px, width 200px
const addBox = boxlist => {
  const { getByLabelText, queryByText } = boxlist;
  const bgColorInput = getByLabelText('Background color:');
  const widthInput = getByLabelText('Width:');
  const heightInput = getByLabelText('Height:');
  const addBtn = queryByText('Add');
  
  fireEvent.change(bgColorInput, { target: { value: 'red' } });
  fireEvent.change(widthInput, { target: { value: 200 } });
  fireEvent.change(heightInput, { target: { value: 300 } });

  fireEvent.click(addBtn);
};

test('renders without crashing', () => {
  render(<BoxList />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

test('contains list title', () => {
  const { getByText } = render(<BoxList />);
  const title = getByText('BoxList:');
  expect(title).toBeVisible();
});

test('contains new box form title', () => {
  const { getByText } = render(<BoxList />);
  const title = getByText('Add a new box:');
  expect(title).toBeVisible();
});

test('contains empty list message', () => {
  const { getByText } = render(<BoxList />);
  const msg = getByText('Box list is empty');
  expect(msg).toBeVisible();
});

test('add new box', () => {
  
  const boxlist = render(<BoxList />);
  const { queryByText, getAllByDisplayValue } = boxlist;
 
  // no boxes
  expect(queryByText('Box list is empty')).toBeInTheDocument();
  expect(queryByText('X')).not.toBeInTheDocument();

  // add red box of height 300px, width 200px
  addBox(boxlist)

  const deleteBtn = queryByText('X');
  expect(deleteBtn).toBeInTheDocument();
  expect(deleteBtn.previousSibling).toHaveStyle(`
    background-color: red;
    height: 300px;
    width: 200px;
  `);
  
  // expect form to be cleared (form has 3 inputs)
  expect(getAllByDisplayValue('')).toHaveLength(3);

});

test('delete box', () => {
  const boxlist = render(<BoxList />);
  const { queryByText } = boxlist;

  // add red box of height 300px, width 200px
  addBox(boxlist);

  const deleteBtn = queryByText('X');
  fireEvent.click(deleteBtn);
  expect(deleteBtn).not.toBeInTheDocument();
});