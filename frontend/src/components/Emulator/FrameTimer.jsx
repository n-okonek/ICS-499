const FPS = 60.098;

export default class FrameTimer {
  constructor(handleGenerateFrame, handleWriteFrame) {
    this.handleGenerateFrame = handleGenerateFrame;
    this.handleWriteFrame = handleWriteFrame;
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    this.running = false;
    this.requestID = null;
    this.interval = 1e3 / FPS;
    this.lastFrameTime = false;
  }

  start() {
    this.running = true;
    this.requestAnimationFrame();
  }

  stop() {
    this.running = false;
    if (this.requestID) window.cancelAnimationFrame(this.requestID);
    this.lastFrameTime = false;
  }

  isRunning() {
    return this.running;
  }

  requestAnimationFrame() {
    this.requestID = window.requestAnimationFrame(this.onAnimationFrame);
  }

  generateFrame() {
    this.handleGenerateFrame();
    this.lastFrameTime += this.interval;
  }

  onAnimationFrame(time) {
    this.requestAnimationFrame();
    // amount of ms after 60fps frame time (1e3 / FPS)
    const excess = time % this.interval;
    // Align with 60 fps intervals
    const newFrameTime = time - excess;
    // If there is no previous frame time, it is the very first frame and should return early
    if (!this.lastFrameTime) {
      this.lastFrameTime = newFrameTime;
      return;
    }

    const numFrames = Math.round(
      (newFrameTime - this.lastFrameTime) / this.interval,
    );

    // No frames have passed (High Hz display)
    if (numFrames === 0) {
      return;
    }

    // Generate the first frame
    this.generateFrame();
    this.handleWriteFrame();

    const timeToNextFrame = this.interval - excess;
    // First frame has already been rendered. Loop through any skipped frames (if present)
    for (let i = 1; i < numFrames; i++) {
      setTimeout(() => {
        this.generateFrame();
      }, (i * timeToNextFrame) / numFrames);
    }
    // Log that there was a frame skip
    // console.debug('SKIP', numFrames - 1, this.lastFrameTime);
  }
}
