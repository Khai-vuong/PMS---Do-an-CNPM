import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "~/pages/Home";
import Signup from "~/pages/Signup";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
