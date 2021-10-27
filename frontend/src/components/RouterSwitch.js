import React from 'react';
import { Switch, Route } from 'react-router-dom';
import OuterScreenView from '../views/pages/Home/OuterScreenView';

export default function RouterSwitch(){
  return (
    <Switch>
      <Route path="/">
        <OuterScreenView />
      </Route>
      {/* <Route path='/login'>
        <Login />
      </Route>
      <Route path='/create-account'>
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