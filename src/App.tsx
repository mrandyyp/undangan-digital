import { Routes, Route, Navigate } from 'react-router-dom';
import WeddingInvitation from './components/WeddingInvitation';

function App() {
  return (
    <Routes>
      <Route path="/:guestName" element={<WeddingInvitation />} />
      <Route path="/" element={<Navigate to="/tamu-undangan" replace />} />
    </Routes>
  );
}

export default App;
