import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

function Screen(props, ref){
  const canvasRef = React.useRef();
  const contextRef = React.useRef();
  const imageDataRef = React.useRef();
  const bufferRef = React.useRef();
  const buffer8Ref = React.useRef();
  const buffer32Ref = React.useRef();
  
  useImperativeHandle(ref, () => ({
    getCanvas() {
      return canvasRef.current;
    },
    getContext() {
      return contextRef.current;
    },
    setBuffer,
    writeBuffer,
    fitInParent,
    listenForResize
  }))

  const initCanvas = () => {
    const context = contextRef.current;
    context.fillStyle = 'black';
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    const imageData = imageDataRef.current;
    bufferRef.current = new ArrayBuffer(imageData.data.length);
    const buffer = bufferRef.current
    buffer8Ref.current = new Uint8ClampedArray(buffer);
    buffer32Ref.current = new Uint32Array(buffer);
    const buffer32 = buffer32Ref.current;
    
    //set alpha
    for (let i = 0; i < buffer32.length; ++i) {
      buffer32[i] = 0xff000000;
    }
  }

  useEffect(() => {
    //Need to assign 2d context to ref so it can be accessed in other functions
    contextRef.current = canvasRef.current.getContext('2d');
    imageDataRef.current = contextRef.current.getImageData(
      0,
      0,
      SCREEN_WIDTH,
      SCREEN_HEIGHT
    );
    initCanvas(); 
  }, [])
  
  const setBuffer = buffer => {
    let i = 0;
    for (let y = 0; y < SCREEN_HEIGHT; ++y) {
      for (let x = 0; x < SCREEN_WIDTH; ++x) {
        i = y * 256 + x;
        buffer32Ref.current[i] = 0xff000000 | buffer[i];
      }
    }
  }
  
  const writeBuffer = () => {
    imageDataRef.current.data.set(buffer8Ref.current);
    contextRef.current.putImageData(imageDataRef.current, 0, 0);
  }
  
  const fitInParent = () => {
    let parent = canvasRef.current.parentNode;
    let parentWidth = parent.clientWidth;
    let parentHeight = parent.clientHeight;
    let parentRatio = parentWidth / parentHeight;
    let desiredRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
    const canvas = canvasRef.current;
    if (desiredRatio < parentRatio) {
      canvas.style.width = `${Math.round(parentHeight * desiredRatio)}px`;
      canvas.style.height = `${parentHeight}px`;
    } else {
      canvas.style.width = `${parentWidth}px`;
      canvas.style.height = `${Math.round(parentWidth / desiredRatio)}px`;
    }
  }

  const listenForResize = () => {
    const parent = canvasRef.current.parentNode;
    // Re call fitInParent when the size of the parent changes
    parent.addEventListener('resize', (event) => {
      console.log('resize');
      fitInParent();
    })
    
    const checkResize = mutations => {
      const event = new CustomEvent('resize', {});
      mutations[0].target.dispatchEvent(event);
    }
    const observer = new MutationObserver(checkResize);
    observer.observe(parent, {attributes: true, attributeOldValue: true, attributeFilter: ['style']});  
  }

  return (
      <canvas
        className="Screen"
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        ref={canvasRef}
      />
  )
}

Screen = forwardRef(Screen);
export default Screen;