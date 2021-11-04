import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

export default function Login() {
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
    <ListGroup horizontal key={idx}>
      <ListGroup.Item>{item.name}</ListGroup.Item>
      <ListGroup.Item>{item.rom}</ListGroup.Item>
      <ListGroup.Item>{item.date}</ListGroup.Item>
    </ListGroup>
  ));

  return (
    <Layout>
      <div className="grid-container">
        <ListGroup horizontal className="list-header">
          <ListGroup.Item>Name</ListGroup.Item>
          <ListGroup.Item>Rom File</ListGroup.Item>
          <ListGroup.Item>Last Save Date</ListGroup.Item>
        </ListGroup>
        {list}
      </div>
    </Layout>
  )
}