import { onAuthStateChanged } from "firebase/auth";
import {createContext,useState,useEffect} from "react";
import { auth } from "../firebase-config";

export  const AuthContext = createContext();

const AuthProvider = ({ children }) =>{
    const[user,setUser] =  useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            setUser(user)
            setLoading(false)
        })
    }
    ,[])
    if(loading){
        return "loading"
    }
    return(<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>)
}

export default AuthProvider