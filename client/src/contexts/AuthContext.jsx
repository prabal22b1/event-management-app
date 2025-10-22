import React,{createContext,useContext,useState,useEffect}  from "react";
import api from "../utils/axiosConfig"; 

const AuthContext= createContext();

export const useAuth= () => {
    const context= useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider= ({children}) => {

    const [user,setUser]= useState(null);
    const [loading,setLoading]= useState(true);
    const [isAuthenticated,setIsAuthenticated]= useState(false);

    useEffect(() => {
        checkAuthStatus();
    },[]);
    
    const checkAuthStatus= async() => {
        try{
            setLoading(true);
            const response= await api.get('/users/auth/me/');
            setUser(response.data.user);
            setIsAuthenticated(true);
        }catch(error){
            console.error("Error checking auth status:",error);
            setUser(null);                          
            setIsAuthenticated(false);
        }finally{
            setLoading(false);
        }};


    const login= async(credentials) => {
        try{
            const response= await api.post('/users/auth/login/',credentials);
            setUser(response.data.user);
            setIsAuthenticated(true);
            return {success:true,user:response.data.user  };
        }catch(error){
            console.error("Login error:",error);
            return {
                success:false,
                error: error.response?.data?.detail||error.response?.data?.message || 'Login failed'};
        }
    };

    const logout= async() => {
        try{
            await api.post('/users/auth/logout/');
        }catch(error){
            console.error("Logout error:",error);
        }finally{
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const register= async(userData) => {
        try{
            const response= await api.post('/users/register/',userData);

            return {success:true,message:"Registration successful. Please log in."};
        }catch(error){
            console.error("Registration error:",error);
            return {
                success:false,
                error: error.response?.data || "Registration failed"};
            }   
    };
    
    const value= {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}