import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { TrainSearchPage } from './pages/TrainSearchPage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';
import { TrainSchedulePage } from './pages/TrainSchedulePage';
import { TrainDetailsPage } from './pages/TrainDetailsPage';
import { StationSearchPage } from './pages/StationSearchPage';
import { StationDetailPage } from './pages/StationDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trains" element={<TrainSearchPage />} />
              <Route path="/train/:trainNumber/live" element={<LiveTrackingPage />} />
              <Route path="/train/:trainNumber/schedule" element={<TrainSchedulePage />} />
              <Route path="/schedule" element={<TrainSchedulePage />} />
              <Route path="/train/:trainNumber" element={<TrainDetailsPage />} />
              <Route path="/stations" element={<StationSearchPage />} />
              <Route path="/station/:code" element={<StationDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
