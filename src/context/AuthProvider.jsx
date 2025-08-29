import React, {useState, createContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useLocation } from 'react-router-dom';


export const AuthContext = createContext();

function AuthProvider({children}) {
    const navigate = useNavigate();
    const location = useLocation();

    const key = Object.keys(localStorage).find(k => k.includes("firebase:authUser"));
    console.log("JSON: ",JSON.parse(localStorage.getItem(key)));

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if(user){
                navigate('/quiz-creator', { replace: true });
            }else{
                setUser({});
                if(location.pathname !== '/signup' && location.pathname !== '/login'){
                    navigate('/login', { replace: true });
                }
            }
            setLoading(false);
        })
        //Clean function
        return () => unsubscribe();
    }, [navigate])


    return (
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export default  AuthProvider;