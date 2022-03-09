import { doc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import {  useUserContext } from '../context/auth';
import { auth, database } from '../firebase-config';

const Navbar = () =>{
    const { user,logOut } = useUserContext();

    const navigate = useNavigate();
    const handleSignOut = async () =>{
        console.log(auth.currentUser.uid)
        const docRef = doc(database,"users",auth.currentUser.uid);
        const payload = {
            isOnline:false
        }
        await updateDoc(docRef,payload)
        await logOut();
        navigate("/login")

    }
    return(
    <header>
        <div className="logo">
            <h3><Link className='logo-link' to="/">Messenger</Link></h3>
        </div>
        <nav>
            { user ? 
                <ul>
                    <li><Link className='nav-link' to="/profile">Profile</Link></li>
                    <li><input type="submit" className='btn' onClick={handleSignOut} value="Logout" /></li>
                </ul> 
                
                :

                <ul>
                    <li><Link className='nav-link' to="/register">Register</Link></li>
                    <li><Link className='nav-link' to="/login">Login</Link></li>
                </ul>
            }
        </nav>
    </header>
    );
};

export default Navbar