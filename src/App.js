import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderOnline from "./pages/OrderOnline";
import Myprofile from "./pages/Myprofile";
import Mycart from "./pages/Mycart";
import Search from "./pages/Search";
import Admin from "./pages/Admin";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/OrderOnline" element={<OrderOnline />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Myprofile" element={<Myprofile />} />
        <Route path="/Mycart" element={<Mycart />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
