import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DogList from './DogList';
import FindDog from './FindDog';

const Routes = ({ dogs }) => {
  return (
    <Switch>
      <Route exact path="/dogs"><DogList dogs={dogs}/></Route>
      <Route path="/dogs/:name"><FindDog dogs={dogs}/></Route>
      <Redirect to="/dogs" />
    </Switch>
  );
};

export default Routes;