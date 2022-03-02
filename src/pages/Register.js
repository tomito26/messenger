 import { useState} from 'react'
 import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,database } from '../firebase-config';
import { setDoc,doc } from 'firebase/firestore';

const Register = () =>{
    const[data,setData] = useState({
        name:"",
        email:"",
        password:"",
        error:null,
        loading:false
    })

    const {name,email,password,error,loading} = data;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!name && !email && !password){
            setData({...data,error:"All fields are required"});
        }
        try{
            const result = await createUserWithEmailAndPassword(auth,email,password)
            const docRef = doc(database,"users",result.user.uid)
            const payload = {
                name:name,
                email:email,
                password:password
            }
            await setDoc(docRef,payload)
        }catch(error){
            setData({...data,error:error.message})
        }

    };
    return(
    <section>
        <h3>Create An Account</h3>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                 type="text" 
                 className="form-control" 
                 name="name" 
                 value={name}
                 onChange={e=>setData({...data,[e.target.name]:e.target.value})}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                 type="email" 
                 name="email" 
                 className="form-control" 
                 value={email}
                 onChange={e=>setData({...data,[e.target.name]:e.target.value})}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                 type="password" 
                 name="password" 
                 className="form-control" 
                 value={password}
                 onChange={e=>setData({...data,[e.target.name]:e.target.value})}
                />
            </div>
            {error ? <p className='error'>{error}</p>: null}
            <div className="btn-container">
                <input type="submit" value="Register" className="btn" />
            </div>
        </form>
    </section>
    );
};
export default Register;