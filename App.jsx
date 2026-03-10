import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DocumentUpload from './pages/DocumentUpload';
import HsCodeAdvisor from './pages/HsCodeAdvisor';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<DocumentUpload />} />
                <Route path="/hs-advisor" element={<HsCodeAdvisor />} />

                {/* Placeholder routes for navigation completeness */}
                <Route path="/compliance" element={<Dashboard />} />
                <Route path="/docs" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
