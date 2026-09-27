// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import TrackTrainPage from './pages/TrackTrainPage';
import SearchPage from './pages/SearchPage';
import LiveTrainsPage from './pages/LiveTrainsPage';
import StationsPage from './pages/StationsPage';
import IoTOverviewPage from './pages/IoTOverviewPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <ThemeProvider>
      <SocketProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/track/:trainNumber" element={<TrackTrainPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/live-trains" element={<LiveTrainsPage />} />
                <Route path="/stations" element={<StationsPage />} />
                <Route path="/iot-dashboard" element={<IoTOverviewPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* Fallback route */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SocketProvider>
    </ThemeProvider>
  );
}
