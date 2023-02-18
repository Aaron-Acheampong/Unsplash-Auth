import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    const login = async (inputs) => {
        const res = await axios.post("/api/auth/login", inputs);
        const accessToken = res?.data?.accessToken;
        const roles = res?.data?.roles;
        setCurrentUser({ ...inputs, roles, accessToken });
    };

   /* const logout = async (inputs) => {
        const res = await axios.post("/api/auth/logout");
        localStorage.removeItem("user");
        setCurrentUser(null);
    }; */

    const register = async (inputs) => {
        const res = await axios.post("/api/auth/register", inputs,
        {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
        }); 
    };

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser, persist, setPersist, login, register}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;