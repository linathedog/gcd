import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {Test} from '../Algorithms.js';
import {Start,End} from '../StartEnd.js';
const Routes = (props) => {

  return(
  <div className="content-container">
    <Switch>
      <Route exact path='/'>
        <Start/>
      </Route>
      <Route exaxt path="/alg">
        <Test/>
      </Route>
      <Route exaxt path="/end">
        <End/>
      </Route>
      <Route exact path="/test">
        <Test/>
      </Route>

      <Redirect from='*' to='/404' />
    </Switch>
  </div>
);
};

export default Routes;
