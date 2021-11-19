import React from 'react';
import './sass/styles.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import OuterScreenView from './views/pages/home/OuterScreenView';
import Login from './views/pages/login/Login';
import CreateAccount from './views/pages/createAccount/CreateAccount';
import Library from './views/pages/user/Library';
import Profile from './views/pages/user/Profile';
import UserManagement from './views/pages/admin/UserManagement';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={OuterScreenView} />
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/user/library" component={Library} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/admin/user-management" component={UserManagement} />
      </div>
    </Router>
  );
}

export default App;
