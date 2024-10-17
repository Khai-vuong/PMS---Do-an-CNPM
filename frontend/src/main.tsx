import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import App from "./App.tsx";
import "./index.css";
import Signup from "./pages/Signup/Signup.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </Router>
  </StrictMode>
);
