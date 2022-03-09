import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Profile from "./pages/Profile"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route  path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
      </Router>
    </AuthProvider>
  
  );
}

export default App;
