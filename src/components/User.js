import Img from '../avatar.png'
import { useState,useEffect } from 'react';
import { onSnapshot,doc} from 'firebase/firestore';
import { database } from '../firebase-config';

const User = ({ user,selectedUser,user1,chat })=>{
    const [data,setData] = useState("")
    const user2 = user?.uid
    useEffect(()=>{
        const id = user1 > user2 ? `${user1+user2}`:`${user2+user1}`;
        let unsub = onSnapshot(doc(database,"lastMessage",id),doc => setData(doc.data()));
        return ()=>unsub()
    },[])
    // console.log(data)
    console.log(chat)
    return(
    <div className={`user-wrapper ${chat !== undefined && chat.name === user.name ? "selected-user" : ""}`} onClick={()=>selectedUser(user)}>
        <div className="user-info">
            <div className="user-detail">
                <img src={user.avatar || Img} alt="user avatar" className='avatar' />
                <h4>{ user.name }</h4>
                {data !== undefined && data.from !== user1 && data.unread ===true ? (
                    <small className='unread'>New</small>
                ):null}
            </div>
            <div className={ `user-status ${user.isOnline ? "online" : "offline"} `}></div>
        </div>
        
        {data && (
            <p className='truncate'>
                <strong>{data.from === user1 ? "Me:" : null}</strong>
                {data.text}
                
            </p>
        )}

    </div>
    );
}
export default User;