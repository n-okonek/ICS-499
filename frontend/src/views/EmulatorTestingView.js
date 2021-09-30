import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Emulator from '../components/Emulator';

export default function EmulatorTestingView() {

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
            <div>
                <Emulator romData={romData} paused={paused} />
                <Button onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</Button>
            </div>
        );
    }

    return (
        <div>
            <span>Please load a .nes file</span>
            <input type="file" onChange={handleFileChange}/>
        </div>
    )
}