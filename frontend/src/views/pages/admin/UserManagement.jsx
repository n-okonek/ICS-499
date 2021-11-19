import React, { useState } from "react";
import FullLayout from '../FullLayout';
import { Table, Button } from "react-bootstrap";

export default function UserManagement() {
  //TODO: replace item1 and item2 with API strings
  const item1 = {
    id: 1,
    role: "user",
    email: "joeblow@nunya.com",
    registered: "11/17/2000",
    login: "11/18/2021 11:57am"
  }

  const item2 = {
    id: 2,
    role: "admin",
    email: "nickokonek@gmail.com",
    registered: "11/17/2000",
    login: "11/18/2021 11:57am"
  }

  function warnUser(id) {

  }

  function banUser(id) {

  }

  function deleteUser(id) {

  }


  const listUsers = [item1, item2].map((item, idx) => (
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