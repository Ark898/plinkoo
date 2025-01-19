import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Game1 } from "./pages/Game1";
import { Game2 } from "./pages/Game2";
import { Game3 } from "./pages/Game3";
import { Game4 } from "./pages/Game4";
import { Game5 } from "./pages/Game5";
import { Footer, Navbar } from "./components";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game1" element={<Game1 />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/game3" element={<Game3 />} />
        <Route path="/game4" element={<Game4 />} />
        <Route path="/game5" element={<Game5 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
