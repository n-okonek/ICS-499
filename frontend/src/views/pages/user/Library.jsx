import React, { useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import Layout from '../layout';

export default function Login() {
  //TODO: remove item1 and 2 when connected to backend replace array with object in list
  const item1 = {
    name: "mario",
    rom: "mario.nes",
    date: "11/2/2021"
  };

  const item2 = {
    name: "contra",
    rom: "contra.nes",
    date: "11/4/2020"
  };

  const list = [item1, item2].map((item, idx) => (
    <tr key={idx}>
      <td>{item.name}</td>
      <td>{item.rom}</td>
      <td>{item.date}</td>
    </tr>
  ));

  return (
    <Layout>
      <div className="grid-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rom Name</th>
              <th>Rom File</th>
              <th>Last Save Date</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </Table>
      </div>
    </Layout>
  )
}