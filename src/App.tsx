import React from 'react';
import { RoomAllocation } from './component';

const App: React.FC = (props) => {
  return (
    <>
        <RoomAllocation guestNumber={10} roomNumber={3} />
    </>
  );
}

export default App;
