import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import MainViewPage from './pages/MainViewPage';
import DataEntryPage from './pages/DataEntryPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainViewPage />} />
        <Route path="/data-entry" element={<DataEntryPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
