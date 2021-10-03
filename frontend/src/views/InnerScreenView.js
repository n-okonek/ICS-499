import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Emulator from '../components/Emulator';
import Static from './Static';

export default function InnerScreenView() {

    const [romData, setRomData] = useState();
    const [paused, setPaused] = useState(false);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        // eslint-disable-next-line no-undef
        const reader = new FileReader()
        reader.onload = (readEvent) => {
          var binary = readEvent.target.result
          console.log(binary);
          setRomData(binary)
        }
        reader.readAsBinaryString(file)
      }

    if (romData) {
        return (
            <div id="emulator-container">
                <div id="screen-container">
                    <Emulator romData={romData} paused={paused} />
                </div>
                <Button id="pause-button" variant={paused ? "primary" : "danger"} onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</Button>
            </div>
        );
    }

    return (
        <div id="rom-selector-container">
            <Static width={398} height={373} />
            <Form>
                <Form.Group className="text-center">
                    <Form.Label id="rom-selector-label">please load a .nes file</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange}/>
                </Form.Group>
            </Form>
        </div>
    )
}