import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} exact />
            <Route path='/cart/' element={<CartScreen/>} />
            {/* <Route path="*" element={<ErrorScreen />} /> */}
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
