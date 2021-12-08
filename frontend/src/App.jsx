import React from 'react';
import './sass/styles.scss';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import OuterScreenView from './views/pages/home/OuterScreenView';
import Login from './views/pages/login/Login';
import Logout from './views/pages/login/Logout';
import CreateAccount from './views/pages/createAccount/CreateAccount';
import Library from './views/pages/user/Library';
import Profile from './views/pages/user/Profile';
import UserManagement from './views/pages/admin/UserManagement';
import RomManagement from './views/pages/admin/RomManagement';
import PlayContainer from './views/pages/play/PlayContainer';

function App() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const userRole = useSelector((state) => state.login.userRole);

  return (
    <Router>
      <div>
        <Route exact path="/" component={OuterScreenView} />
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/play" component={PlayContainer} />
        {loggedIn ? (
          <>
            <Route path="/logout" component={Logout} />
            <Route path="/user/library" component={Library} />
            <Route path="/user/profile" component={Profile} />
          </>
        ) : (
          <Redirect exact to="/login" component={Login} />
        )}
      </div>
    </Router >
  );
}

export default App;
