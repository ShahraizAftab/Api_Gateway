import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./pages/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/NewPage";
import NewsPage from "./pages/NewsPage";
import CryptoPage from "./pages/CryptoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newpage" element={<Dashboard />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/crypto" element={<CryptoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
