import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import VendingMachine from './VendingMachine';
import Soda from './Soda';
import Chips from './Chips';
import Candy from './Candy';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <VendingMachine/>
          </Route>
          <Route exact path='/chips'>
            <Chips image="https://images.pexels.com/photos/4109197/pexels-photo-4109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
          </Route>
          <Route exact path='/candy'>
            <Candy image='https://images.pexels.com/photos/1906435/pexels-photo-1906435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
          </Route>
          <Route exact path='/soda'>
            <Soda image='https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
