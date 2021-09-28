import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import jsnes from 'jsnes'

import { nesLoadData } from './emulator'

import tv from '../../images/tv.png'

export default function NESEmulator({ height, width }) {
  const [fileBinary, setFileBinary] = useState(null)

  // Read a local file for now
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    reader.onload = (readEvent) => {
      var binary = readEvent.target.result
      setFileBinary(binary)
    }
    reader.readAsBinaryString(file)
  }

  useEffect(() => {
    if (!fileBinary) {
      const canvas = document.getElementById('emulator-canvas')
      canvas.style.width = '0px'
      canvas.style.visibility = 'visible'

      const placeholder = document.getElementById('placeholder')
      placeholder.style.backgroundColor = '#000'
      placeholder.style.color = '#fff'
      placeholder.style.textAlign = 'center'
      placeholder.style.zIndex = 0;
    }

    if (fileBinary) {
      // inflate canvas
      const canvas = document.getElementById('emulator-canvas')
      canvas.style.width = width + 'px'
      canvas.style.visibility = 'visible'
      const placeholder = document.getElementById('placeholder')
      placeholder.style.width = '0px'
      placeholder.style.height = '0px'
      nesLoadData('emulator-canvas', fileBinary)
    }
  }, [fileBinary])

  return (
    <div>
      <canvas id='emulator-canvas' height='370' width='483' />
      <div id='placeholder' height='370' width='483'>
        <span id='placeholder-text'>No Game Loaded</span>
      </div>
      <div className='tv'><img src={tv} /></div>
      <input type='file' id='rom-selector' onChange={handleFileChange} />
    </div>
  )
}
