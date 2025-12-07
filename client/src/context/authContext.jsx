// import { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const login = async (email, password) => {
//         setLoading(true);
//         setError(null);
//         try {
//             // Replace with your API call
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });
//             const data = await response.json();
//             setUser(data.user);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = () => {
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, loading, error, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };

import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    }; 

    return (
        <AuthContext.Provider value={{session, signOut}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => {

    const session = useContext(AuthContext);

    if(!session){
        throw new Error('useAuthContext must be used within AuthContextProvider')
    }
    return session;
}