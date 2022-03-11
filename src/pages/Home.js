import { useEffect,useState } from 'react'
import Navbar from "../components/Navbar";
import { database,auth } from "../firebase-config";
import { query,onSnapshot,collection, where  } from "firebase/firestore"
import User from '../components/User';

const Home = () => {
  const[users,setUsers] = useState([])
  useEffect(()=>{
    const usersRef = collection(database,"users");
    // create query object 
    const q = query(usersRef,where("uid", "not-in" ,[auth.currentUser.uid]));
    //execute the query
    const unsub = onSnapshot(q,snap=>{
      let users = []
      snap.forEach(doc=> users.push(doc.data()))
      setUsers(users)
    })
    return () => unsub()
    
  },[])
  console.log(users)
  
  return (
    <div className='home-container'>
        <div className="users-container">
          {users.map(user=> <User key={user.uid}/>)}
        </div>
    </div>
  );
};

export default Home;