import {useState} from 'react';
import { auth,database } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'
import {doc, updateDoc } from 'firebase/firestore';
import { useUserContext } from '../context/auth';
const Login = () =>{
    const[data,setData] = useState({
        email:"",
        password:"",
        error:null,
        loading:false
    })
    const navigate = useNavigate();
    

    const {email,password,error,loading} = data;
    const { logIn } = useUserContext()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setData({...data,error:null,loading:true})
        if(!email && !password){
            setData({...data,error:"All fields are required"});
        }
        try{
            const result = await logIn(email,password)
            const docRef = doc(database,"users",result.user.uid)
            const payload = {
                isOnline:true
            }
            await updateDoc(docRef,payload)
            setData({
                email:"",
                password:"",
                error:null,
                loading:false}
            )
            navigate('/')
        }catch(err){
            setData({...data,error:err.message,loading:false})
        
        }

    };
    return(
    <section>
        <h3>Log Into your  Account</h3>
        <form className="form" onSubmit={handleSubmit}>
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
                <input type="submit" value={loading ? "logging in..." : "Login"} disabled={loading} className="btn" />
            </div>
        </form>
    </section>
    );
};

export default Login;