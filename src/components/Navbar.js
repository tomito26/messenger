import { Link } from 'react-router-dom'
const Navbar = () =>{
    return(
    <header>
        <div className="logo">
            <h3><Link className='logo-link' to="/">Messenger</Link></h3>
        </div>
        <nav>
            <ul>
                <li><Link className='nav-link' to="/register">Register</Link></li>
                <li><Link className='nav-link' to="/login">Login</Link></li>
            </ul>
        </nav>
    </header>
    );
};

export default Navbar