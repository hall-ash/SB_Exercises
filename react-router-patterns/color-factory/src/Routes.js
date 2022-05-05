import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ColorList from './ColorList';
import ChooseColor from './ChooseColor';
import ColorForm from './ColorForm';

const Routes = () => {
  const INITIAL_COLORS = JSON.parse(localStorage.getItem('colors')) || {
    'red': '#FF0000',
    'green': '#00ff00',
    'blue': '#0000ff',
  };

  const [colors, setColors] = useState(INITIAL_COLORS);

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors))
  }, [colors]);

  return (
    <Switch>
      <Route exact path="/colors"><ColorList colors={colors}/></Route>
      <Route exact path="/colors/new"><ColorForm setColors={setColors}/></Route>
      <Route exact path="/colors/:color"><ChooseColor colors={colors} /></Route>
      <Redirect to="/colors" />
    </Switch>
  )
};

export default Routes;