import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from './Test/Login';
import SignUp from './Test/SignUp';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
