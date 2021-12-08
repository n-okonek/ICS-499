import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Layout from '../layout';
import Axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setRoms } from '../../../redux/userSlice';

export default function Login() {
  const roms = useSelector((state) => state.user.roms);

  const [selectedFile, setSelectedFile] = useState();

  // Fetch the ROMs from the server.
  const setRomsFromServer = () => {
    Axios.get(process.env.API_URL + '/user/roms', { withCredentials: true })
    .then((res) => {
      console.log(res.data);
    });
  }
  useEffect(setRomsFromServer, [roms]);

  const list = roms.map((item, idx) => (
    <tr key={idx}>
      <td>{item.name}</td>
      <td>{item.rom}</td>
      <td>{item.date}</td>
    </tr>
  ));

  // Change which file is selected.
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload the file to the server.
  const handleFileUpload = (e) => {

    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.onload = (readEvent) => {
      const binary = readEvent.target.result;
      Axios.post(process.env.API_URL + '/rom/', { name: selectedFile.name,
        romdata: binary }, { withCredentials: true })
        .then((res) => {
          Axios.post(process.env.API_URL + '/rom/associate/' + res.data.romid,
            null, { withCredentials: true })
            .then((res) => {
              ;
            });
          alert(selectedFile.name + " successfully uploaded.");
        });
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <Layout>
      <div className="grid-container">
        <Form.Control type="file" onChange={handleFileChange} />
        <Button onClick={handleFileUpload}>Upload ROM</Button>
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
