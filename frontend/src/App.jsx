import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import VibeCheckPage from './pages/VibeCheckPage'
import GeneratingPage from './pages/GeneratingPage'
import ItineraryResultsPage from './pages/ItineraryResultsPage'
import ItineraryDetailPage from './pages/ItineraryDetailPage'
import CreateRoomPage from './pages/CreateRoomPage'
import JoinRoomPage from './pages/JoinRoomPage'
import TripRoomPage from './pages/TripRoomPage'
import PaymentPage from './pages/PaymentPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vibe-check" element={<VibeCheckPage />} />
          <Route path="/generating" element={<GeneratingPage />} />
          <Route path="/itineraries" element={<ItineraryResultsPage />} />
          <Route path="/itineraries/:index" element={<ItineraryDetailPage />} />
          <Route path="/room/create" element={<CreateRoomPage />} />
          <Route path="/room/join" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<TripRoomPage />} />
          <Route path="/room/:roomCode/payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
