import React from 'react';

import NESEmulator from './components/Emulator/NESEmulator';

function App() {
  return (
    <div className="emulator-container">
      <NESEmulator height={240} width={512} />
    </div>
  );
}

export default App;
