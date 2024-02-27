import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtworksList from './components/ArtworksList';
import ArtworkDetail from './components/ArtworkDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact  element={<ArtworksList />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </Router>
  );
}

export default App;