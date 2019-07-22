import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import history from './history';

import Private from './private';
import Guest from './guest';

import Main from '../pages/Main';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      {/* <Route path="/" exact component={Main} /> */}
      <Private path="/" exact component={Main} />
      <Guest path="/signin" component={SignIn} />
      <Guest path="/signup" component={SignUp} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
