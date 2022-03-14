import { useEffect,useState } from 'react'
import { ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { database,auth, storage } from "../firebase-config";
import { query,onSnapshot,collection, where, addDoc, Timestamp, orderBy  } from "firebase/firestore"
import User from '../components/User';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';

const Home = () => {
  const[users,setUsers] = useState([]);
  const [chat,setChat] = useState("");
  const[text,setText] = useState("");
  const[image,setImage] = useState("");
  const [messages,setMessages] = useState([])


  const user1 = auth.currentUser.uid;

  useEffect(()=>{
    const usersRef = collection(database,"users");
    // create query object 
    const q = query(usersRef,where("uid", "not-in" ,[user1]));
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
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1+user2}`:`${user2+user1}`;
    const messsageRef = collection(database,"messages",id,"chat");
    const q = query(messsageRef,orderBy("createdAt","asc"));
    onSnapshot(q,snap=>{
      let messages = []
      snap.forEach(doc=>{
        messages.push(doc.data());
      })
      setMessages(messages)
    })

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1+user2}`:`${user2+user1}`;
    let url;
  
    if(image){
      console.log(image)
      const imgRef = ref(storage,`images/${new Date().getTime()} - ${image.name}`);
      const snap = await uploadBytes(imgRef,image);
      const dlUrl = await getDownloadURL(ref(storage,snap.ref.fullPath));
      url = dlUrl;
    }
    await addDoc(collection(database,"messages",id,"chat"),{
      text,
      from:user1,
      to:user2,
      createdAt:Timestamp.fromDate(new Date()),
      media:url || ""
    });
    setText("")
  
  };
  console.log(messages)
  
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
                <div className="messages">
                  { messages.length ? messages.map((message,i)=> <Message key={i} message={message} user1={user1}/>): null}
                </div>
                <MessageForm 
                  handleSubmit={handleSubmit} 
                  setText={setText} 
                  text={text}
                  setImage={setImage}
                />
              </>
          
            
            }
        </div>
    </div>
  );
};

export default Home;