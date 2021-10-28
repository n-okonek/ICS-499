import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sass/styles.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import OuterScreenView from './views/pages/Home/OuterScreenView';
import Login from './views/pages/login/Login';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={OuterScreenView} />
        <Route path='/login' component={Login} />
      </div>
    </Router>
  );
}

export default App;
