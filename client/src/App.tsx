import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
