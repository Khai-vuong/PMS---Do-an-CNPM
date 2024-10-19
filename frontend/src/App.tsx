import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import "./index.css";
import Signup from "./pages/Signup/Signup.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/auth/signup' element={<Signup />}></Route>

        </Routes>
      </Router>
    </>
  )
}

export default App;
