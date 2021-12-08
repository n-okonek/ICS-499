import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setLoginState } from '../../../redux/loginSlice';

import Axios from 'axios';
import Layout from '../layout';

export default function Logout() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  // Have the server remove our session.
  function serverLogout() {
    Axios.post(process.env.API_URL + "/user/logout", null,
      { withCredentials: true })
    .then(() => {
      dispatch(setLoginState(false));
      let path = "/";
      history.push(path);
    });
  }
  useEffect(serverLogout, []);

  return (
    <Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    userRole: state.userRole
  }
}
