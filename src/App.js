import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </Router>
  
  );
}

export default App;
