import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import BookTable from "./pages/BookTable";

import Header from "./components/Header";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/About" element={<About />} />
        <Route path="/BookTable" element={<BookTable />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
