import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Layout from '../layout';

import { useDispatch, useSelector } from 'react-redux';
import { setRoms } from '../../../redux/userSlice';

export default function Login() {
  const roms = useSelector((state) => state.user.roms);

  const list = roms.map((item, idx) => (
    <tr key={idx}>
      <td>{item.name}</td>
      <td>{item.rom}</td>
      <td>{item.date}</td>
    </tr>
  ));

  return (
    <Layout>
      <div className="grid-container">
        <Table striped hover>
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