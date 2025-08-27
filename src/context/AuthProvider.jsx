import React, {useState, createContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

function AuthProvider({children}) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            console.log("Auth state changed: ", user);
            if(user){
                setLoading(false);
                navigate('/quiz-creator');
                
            }else{
                setLoading(false);
                navigate('/login');
            }
        })
        //Clean function
        return () => unsubscribe();
    }, [navigate])


    return (
        <AuthContext.Provider value={{ user}}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export default  AuthProvider;