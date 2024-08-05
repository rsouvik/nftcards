import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/Cart';
import Layout from './components/Layout';
import { CartProvider } from './contexts/CartContext';

const App: React.FC = () => {
  return (
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
  );
};

export default App;
