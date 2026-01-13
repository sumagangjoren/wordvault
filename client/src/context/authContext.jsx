import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {

        async function loadSession() {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        }

        loadSession();

        // Listen to login/logout
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_, currentSession) => {
                setSession(currentSession);
                setLoading(false);
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };


    const signIn = async ({email, password}) => {
        setLoading(true);
        const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
            }
        });
        setLoading(false);
        if (error) {
            // alert(error.error_description || error.message);
            setErrorMessage(error.message)
            return { success: false, error: error };
        }
        else {
            console.log(data)

            return { success: true };
        }
    };

    const signUp = async ({name, email, password}) => {
        setLoading(true);
        const { error, data } = await supabase.auth.signUp({
            email, 
            password,
            options: {
                emailRedirectTo: window.location.origin,
            },
        })
        setLoading(false);
        if(error) {
            console.error(error)
            console.log(data)
            console.log('hi')
            setErrorMessage(error.message)
            return { success: false, error };
        }
        else {
            console.log("hello")
            console.log(data)
            return { success: true };
        }
    }

    return (
        <AuthContext.Provider value={{session, signOut, signIn, loading, signUp, errorMessage}}>
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