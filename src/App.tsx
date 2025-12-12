import { Routes, Route, Navigate } from 'react-router-dom';
import WeddingInvitation from './components/WeddingInvitation';
import GuestCommentsPage from './components/GuestCommentsPage';

function App() {
  return (
    <Routes>
      <Route path="/ucapan" element={<GuestCommentsPage />} />
      <Route path="/:guestName" element={<WeddingInvitation />} />
      <Route path="/" element={<Navigate to="/tamu-undangan" replace />} />
    </Routes>
  );
}

export default App;
