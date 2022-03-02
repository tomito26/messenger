import { doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { auth, database } from '../firebase-config';

const Navbar = () =>{
    const handleSignOut = async () =>{
        const docRef = doc(database,"users",auth.currentUser.uid);
        const payload = {
            isOnline:false
        }
        await updateDoc(docRef,payload)

    }
    return(
    <header>
        <div className="logo">
            <h3><Link className='logo-link' to="/">Messenger</Link></h3>
        </div>
        <nav>
            { auth.currentUser ? 
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