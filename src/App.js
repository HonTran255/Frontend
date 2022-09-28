import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
// import PrivateRoute from '../components/route/PrivateRoute';
// import AdminRoute from '../components/route/AdminRoute';
//core
import HomePage from './pages/core/HomePage';
import UserSmallCard from "./components/card/UserSmallCard";





function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" exact element= {<HomePage/>}/>
          <Route path="/user"  element={<UserSmallCard/>} />
          </Routes>
         
        </BrowserRouter>
    </div>
  );
}

export default App;
