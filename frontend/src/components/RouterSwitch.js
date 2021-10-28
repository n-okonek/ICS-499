import React from 'react';
import { Switch, Route } from 'react-router-dom';

//paths to page view components
import OuterScreenView from '../views/pages/Home/OuterScreenView';
import Login from '../views/pages/login/Login';

export default function RouterSwitch(){
  return (
    <Switch>
      <Route path="/" component={OuterScreenView} />
      <Route path='/login' component={Login} />
      {/* <Route path='/create-account'>
        <CreateAccount />
      </Route>
      <Route path='/logout'>
        <Logout />
      </Route>
      <Route path='/profile'>
        <UserProfile />
      </Route>
      <Route path='/library'>
        <Library />
      </Route>
      <Route>
        <UserManagement />
      </Route>
      <Route>
        <RomManagement />
      </Route> */}
    </Switch>
  );
}