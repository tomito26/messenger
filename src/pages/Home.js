import { useEffect,useState } from 'react'
import Navbar from "../components/Navbar";
import { database,auth } from "../firebase-config";
import { query,onSnapshot,collection, where  } from "firebase/firestore"
import User from '../components/User';
import MessageForm from '../components/MessageForm';

const Home = () => {
  const[users,setUsers] = useState([]);
  const [chat,setChat] = useState("");
  const[text,setText] = useState("");
  useEffect(()=>{
    const usersRef = collection(database,"users");
    // create query object 
    const q = query(usersRef,where("uid", "not-in" ,[auth.currentUser.uid]));
    //execute the query
    const unsub = onSnapshot(q,snap=>{
      let users = [];
      snap.forEach(doc=> users.push(doc.data()));
      setUsers(users);
    });
    return () => unsub();
    
  },[])
  // console.log(users)
  const selectedUser = (user)=>{
    setChat(user)
    console.log(chat)
  }
  console.log(chat)
  
  return (
    <div className='home-container'>
        <div className="users-container">
          {users.map(user=> <User key={user.uid} user={user} selectedUser={selectedUser} />)}
        </div>
        <div className="messages-container">
          {
            !chat ? <h3 className='no-conv'>Select a user to start conversation</h3>
              :
              <>
                <div className='messages-user'>
                  {chat.name}
                </div>
                <MessageForm/>
              </>
          
            
            }
        </div>
    </div>
  );
};

export default Home;