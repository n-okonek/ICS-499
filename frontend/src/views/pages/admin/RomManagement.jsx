import React, { useState } from "react";
import FullLayout from '../FullLayout';
import { Table, Button } from "react-bootstrap";

export default function RomManagement() {
  //TODO: replace item1 and item2 with API script
  const item1 = {
    id: 1,
    romName: "Mario",
    romFile: "super_mario.nes",
    romHash: "1s23e54f8w6a2d5e",
    dateUploaded: "10/6/2021 21:15",
    dateUsed: "10/6/2021 22:00",
    uploadedBy: "nickokonek@gmail.com",
  };

  const item2 = {
    id: 2,
    romName: "Contra",
    romFile: "contra.nes",
    romHash: "2e5s6r231f5q6f1z",
    dateUploaded: "10/4/2021 08:30",
    dateUsed: "10/5/2021 12:00",
    uploadedBy: "tigerking@oklahomastate.pen"
  };

  function deleteRom(id) {

  }

  const listRoms = [item1, item2].map((item, idx) => (
    <tr key={idx}>
      <td>{item.id}</td>
      <td>{item.romName}</td>
      <td>{item.romFile}</td>
      <td>{item.romHash}</td>
      <td>{item.dateUploaded}</td>
      <td>{item.dateUsed}</td>
      <td>{item.uploadedBy}</td>
      <td><Button variant="danger" onClick={deleteRom(item.id)}>Delete</Button></td>
    </tr>
  ));

  return (
    <FullLayout>
      <div className="grid-container">
        <Table hover striped>
          <thead>
            <tr>
              <th>Rom ID</th>
              <th>Rom Name</th>
              <th>Rom File</th>
              <th>Rom Hash</th>
              <th>Date Uploaded</th>
              <th>Date Last Used</th>
              <th>Uploaded By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listRoms}
          </tbody>
        </Table>
      </div>
    </FullLayout>
  )
}