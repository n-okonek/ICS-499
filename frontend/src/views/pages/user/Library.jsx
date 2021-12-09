import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Layout from '../layout';
import Axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setRoms } from '../../../redux/userSlice';
import { Link } from 'react-router-dom';

export default function Login() {
  const roms = useSelector((state) => state.user.roms);

  const [selectedFile, setSelectedFile] = useState();
  const [uploadEnabled, setUploadEnabled] = useState(false);

  const dispatch = useDispatch();

  // Fetch the ROMs from the server.
  const setRomsFromServer = () => {
    Axios.get(process.env.API_URL + '/user/roms', { withCredentials: true })
    .then((res) => {
      const romsFormatted = res.data.map((item) => (
        { name: item.rom.name, id: item.rom.romid, date: item.updatedAt }
      ));
      dispatch(setRoms(romsFormatted));
    });
  }
  useEffect(setRomsFromServer, []);

  const deleteRom = (romid) => {
    Axios.delete(process.env.API_URL + '/rom/' + romid,
      { withCredentials: true } )
    .then(() => {
        console.log("deleted ROM ", romid);
        setRomsFromServer();
    });
  };

  const list = roms.map((item, idx) => (
    <tr key={idx}>
      <td>{item.name}</td>
      <td>
        <Link to={{
          pathname: "/play",
          state: { romid: item.id}}}>
            <Button>Play</Button>
        </Link>
      </td>
      <td><Button onClick={() => {deleteRom(item.id);}}>Delete</Button></td>
    </tr>
  ));

  // Change which file is selected.
  const handleFileChange = (e) => {
    setUploadEnabled(true);
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
              setRomsFromServer();
            });
        });
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <Layout>
      <div className="grid-container">
        <Form.Control type="file" onChange={handleFileChange} />
        <Button id="upload-button" disabled={uploadEnabled === false} onClick={handleFileUpload}>Upload ROM</Button>
        <Table striped hover>
          <thead>
            <tr>
              <th>Rom Name</th>
              <th></th>
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
