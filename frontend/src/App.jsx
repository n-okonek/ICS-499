import React from 'react';
import './sass/styles.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import OuterScreenView from './views/pages/home/OuterScreenView';
import Login from './views/pages/login/Login';
import CreateAccount from './views/pages/createAccount/CreateAccount';
import Library from './views/pages/user/Library'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={OuterScreenView} />
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/library" component={Library} />
      </div>
    </Router>
  );
}

export default App;
