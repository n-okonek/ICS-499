import React, { useState, useEffect } from "react";
import FullLayout from '../FullLayout';
import { Table, Button } from "react-bootstrap";
import Axios from 'axios';
import { useSelector } from 'react-redux';

import { setUsers } from '../../../redux/adminSlice';

export default function UserManagement() {
  const users = useSelector((state) => state.admin.users)

  function getUsers() {
    Axios.get(process.env.API_URL + '/user', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          dispatch(setUsers(res.data));
        } else {
          dispatch(setUsers(res.data.message));
        }
      });
  }
  useEffect(getUsers, []);

  function warnUser(id) {

  }

  function banUser(id) {

  }

  function deleteUser(id) {

  }


  const listUsers = users.map((item, idx) => (
    <tr key={idx}>
      <td>{item.id}</td>
      <td>{item.role}</td>
      <td>{item.email}</td>
      <td>{item.registered}</td>
      <td>{item.login}</td>
      <td><Button variant="warning" onClick={warnUser(item.id)}>Warn</Button></td>
      <td><Button variant="dark" onClick={banUser(item.id)}>Ban</Button></td>
      <td><Button variant="danger" onClick={deleteUser(item.id)}>Delete</Button></td>
    </tr>
  ))

  return (
    <FullLayout>
      <div className="grid-container">
        <Table striped hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Role</th>
              <th>Email</th>
              <th>Date Registered</th>
              <th>Last Login</th>
              <th>Warn User</th>
              <th>Ban User</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {listUsers}
          </tbody>
        </Table>
      </div>
    </FullLayout>
  )
}