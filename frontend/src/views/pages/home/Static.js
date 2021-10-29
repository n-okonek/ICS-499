import React, { useRef, useEffect } from 'react';

const Static = (props) => {
  const canvasRef = useRef(null);

  const draw = (ctx, h, v, pw, ph) => {
    const lum = Math.floor(Math.random() * 40);

    ctx.fillStyle = `hsl(0, 0%,${lum}%)`;
    ctx.fillRect(h, v, pw, ph);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const tvHeight = 373;
    const tvWidth = 398;
    const pixelWidth = 4;
    const pixelHeight = 3;

    let animationFrameId;

    const render = () => {
      for (let v = 0; v < tvHeight; v += pixelHeight) {
        for (let h = 0; h < tvWidth; h += pixelWidth) {
          draw(context, h, v, pixelWidth, pixelHeight);
        }
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas ref={canvasRef} width={398} height={373} {...props} />
  );
};

export default Static;
