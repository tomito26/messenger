import img  from '../avatar.png'
import { useEffect, useState } from 'react';
import Camera from '../components/svg/Camera';
import { storage,database, auth } from '../firebase-config';
import { ref,getDownloadURL,uploadBytes } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const Profile = () =>{
    const[image,setImage] = useState('')
    const [user,setUser] = useState({})
    useEffect(()=>{
        getDoc(doc(database,"users",auth.currentUser.uid)).then(docSnap=>{
            if(docSnap.exists){
                setUser(docSnap.data())
            }
        })
        if(image){
            const uploadingImage = async ()=>{
                const imgRef = ref(storage,`avatar/${new Date().getTime()} - ${image.name}`)
                try{
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
    },[image])
    console.log(user)
   
    return (
    <section>
        <div className="profile-container">
            <div className="image-container">
                <img src={!user || !user.avatar ? img : user.avatar} alt="avatar" />
                <div className="overlay">
                    <label htmlFor="photo">
                        <Camera/>
                    </label>
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