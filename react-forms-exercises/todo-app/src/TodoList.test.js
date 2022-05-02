import React from 'react';
import { fireEvent, render} from '@testing-library/react';
import TodoList from './TodoList';

const addTodo = todoList => {
  const { getByLabelText, queryByText } = todoList;
  const input = getByLabelText('Todo:');

  fireEvent.change(input, { target: { value: 'test todo' } });

  const addBtn = queryByText('Add');
  fireEvent.click(addBtn);
};

const editTodo = todoList => {
  const { queryByText } = todoList;
  const editBtn = queryByText('Edit');
  fireEvent.click(editBtn);

  const saveBtn = queryByText('Save');
  const input = saveBtn.previousSibling;

  fireEvent.change(input, { target: { value: 'edited todo' } });
  fireEvent.click(saveBtn);
}

test('renders without crashing', () => {
  render(<TodoList />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

test('contains list title', () => {
  const { getByText } = render(<TodoList />);
  const title = getByText('Todos:');
  expect(title).toBeVisible();
});

test('contains new todo form title', () => {
  const { getByText } = render(<TodoList />);
  const title = getByText('Add a new todo:');
  expect(title).toBeVisible();
});

test('contains empty list message', () => {
  const { getByText } = render(<TodoList />);
  const msg = getByText('No todos.');
  expect(msg).toBeVisible();
});

test('add new todo', () => {
  const todolist = render(<TodoList />);
  const { queryByText, getAllByDisplayValue } = todolist;

  // no todos
  expect(queryByText('No todos.')).toBeInTheDocument();
  expect(queryByText('X')).not.toBeInTheDocument();
  expect(queryByText('Edit')).not.toBeInTheDocument();

  // add todo 'test todo'
  addTodo(todolist);

  // expect todo 'test todo'
  const deleteBtn = queryByText('X');
  const editBtn = queryByText('Edit');
  const todo = queryByText('test todo');
  expect(deleteBtn).toBeInTheDocument();
  expect(editBtn).toBeInTheDocument();
  expect(todo).toBeInTheDocument();

  // expect form to be cleared
  expect(getAllByDisplayValue('')).toHaveLength(1);
});

test('delete todo', () => {
  const todolist = render(<TodoList />);
  const { queryByText } = todolist;

  // add todo 'test todo'
  addTodo(todolist);

  const deleteBtn = queryByText('X');
  const editBtn = queryByText('Edit');
  const todo = queryByText('test todo');
  
  // delete todo
  fireEvent.click(deleteBtn);
 
  expect(deleteBtn).not.toBeInTheDocument();
  expect(editBtn).not.toBeInTheDocument();
  expect(todo).not.toBeInTheDocument();

});

test('edit todo', () => {
  const todolist = render(<TodoList />);
  const { queryByText } = todolist;

  // add todo 'test todo'
  addTodo(todolist);
  expect(queryByText('test todo')).toBeInTheDocument();

  // new name = 'edited todo'
  editTodo(todolist);

  const editedTodo = queryByText('edited todo');
  expect(editedTodo).toBeInTheDocument;
  expect(queryByText('test todo')).not.toBeInTheDocument();
})