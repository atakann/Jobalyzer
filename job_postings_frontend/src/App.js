import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Stats from './components/Stats';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} index />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/stats" element={<Stats />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
