import { Navigate, Route,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, useUserContext } from "../context/auth";

const PrivateRoute = ({ children }) =>{
    const { user } = useUserContext();
    if(!user){
        return <Navigate to="/login"/>
    }
    
    return children
};
export default PrivateRoute