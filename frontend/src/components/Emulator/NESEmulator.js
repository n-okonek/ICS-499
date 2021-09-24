import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import jsnes from 'jsnes'

import { nesLoadData } from './emulator'

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
      canvas.style.position = 'absolute'

      const placeholder = document.getElementById('placeholder')
      placeholder.style.backgroundColor = '#000'
      placeholder.style.color = '#fff'
      placeholder.style.width = width + 'px'
      placeholder.style.height = width + 'px'
      placeholder.style.textAlign = 'center'
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
      <canvas id='emulator-canvas' height='240' width='256' />
      <div id='placeholder'>
        <span id='placeholder-text'>No Game Loaded</span>
      </div>
      <input type='file' id='rom-selector' onChange={handleFileChange} />
    </div>
  )
}
