import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import Signup from "./pages/Signup/Signup.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import Login from "./pages/Login/Login.tsx";
import Createproject from "./pages/Createproject/Createproject.tsx";
import Createtask from "./pages/Createtask/Createtask.tsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/create-project" element={<Createproject />}></Route>
          <Route path="/create-task" element={<Createtask />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
