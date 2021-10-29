import React from 'react';
import './sass/styles.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import OuterScreenView from './views/pages/home/OuterScreenView';
import Login from './views/pages/login/Login';

function App () {
  return (
    <Router>
      <div>
        <Route exact path="/" component={OuterScreenView} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
