import React from 'react';
import './App.css';
import Header from './components/Nav/Header';
import Home from './components/Home/Home';
import Plakater from './components/Plakater/Plakater';
import Footer from './components/Nav/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OmOs from './components/OmOs/OmOs';
import Kontakt from './components/Kontakt/Kontakt';
import Login from './components/Login/Login';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <UserProvider>
      <CartProvider>
    <Router>
      <div className="app-container">
        <div className="centered-div">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plakater" element={<Plakater />} />
            <Route path="/omos" element={<OmOs />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
    </CartProvider>
    </UserProvider>
  );
}

export default App;
