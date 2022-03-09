import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {createContext,useState,useEffect, useContext} from "react";
import { auth } from "../firebase-config";
import Loading from '../components/Loading'


export  const AuthContext = createContext({
    user:null,
    signUp:()=>{},
    login:()=>{},
    logOut:()=>{},
    
});

export const AuthProvider = ({ children }) =>{
    const[user,setUser] =  useState(null);
    const [loading,setLoading] = useState(true);

    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function signUp(auth,email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function logOut(){
        return signOut(auth);
    }
    
    useEffect(()=>{
       const unsub =  onAuthStateChanged(auth,user=>{
            setUser(user)
            setLoading(false)
        })
        return unsub
    },[]);

 

    if(loading){
        return <Loading/>
    }
    return(
        <AuthContext.Provider value={{ user,signUp,logIn,logOut }}>
            {children}
        </AuthContext.Provider>)
}

 export function useUserContext(){
    const { user, signUp,logIn ,logOut } = useContext(AuthContext)
    return { user,signUp,logIn,logOut }
 }

