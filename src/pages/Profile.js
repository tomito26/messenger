import img  from '../avatar.png'
import { useEffect, useState } from 'react';
import Camera from '../components/svg/Camera';
import { storage,database, auth } from '../firebase-config';
import { ref,getDownloadURL,uploadBytes,deleteObject } from 'firebase/storage'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import Delete from '../components/svg/Delete';
import { useNavigate } from 'react-router-dom';

const Profile = () =>{
    const[image,setImage] = useState('')
    const [user,setUser] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{        
        if(image){
            const uploadingImage = async ()=>{
                const imgRef = ref(storage,`avatar/${new Date().getTime()} - ${image.name}`)
                try{
                    if(user.avatar){
                        await deleteObject(ref(storage,user.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef,image)
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
                    await updateDoc(doc(database,"users",auth.currentUser.uid),{
                        avatar:url,
                        avatarPath:snap.ref.fullPath
                    })

                    setImage("");
                }catch(err){
                    console.log(err.message)
                }
            }
            uploadingImage()
        }
        const unsub = onSnapshot(doc(database,"users",auth.currentUser.uid),(snap)=>{
            if(snap.exists){
                setUser(snap.data())
            }
        })
        return ()=>unsub();
    },[image])
    console.log(user)
    const deleteImage = async ()=>{
        const confirm = window.confirm("Delete avatar?");
        
        if(confirm){
            await deleteObject(ref(storage,user.avatarPath))

            await updateDoc(doc(database,"users",auth.currentUser.uid),{
                avatar:"",
                avatarPath:""
            })
            navigate("/")
        }

    }
   
    return (
    <section>
        <div className="profile-container">
            <div className="image-container">
                <img src={!user || !user.avatar ? img : user.avatar} alt="avatar" />
                <div className="overlay">
                    <label htmlFor="photo">
                        <Camera/>
                    </label>
                    {user.avatar ? <Delete deleteImage={deleteImage}/> : null}
                    <input type="file" accept='image/*' style={{display:"none"}} id="photo"  onChange={e=>setImage(e.target.files[0])}/>
                </div>
            </div>
            <div className="text-container">
                <h3 style={{marginBottom:"10px"}}>{!user ?  "" : user.name}</h3>
                <p>{!user ? "" :user.email}</p>
                <hr />
                <small>Joined on: { !user || !user.createdAt ? "" : user.createdAt.toDate().toDateString()} </small>
            </div>
        </div>
    </section>
    ) 
}
export default Profile;