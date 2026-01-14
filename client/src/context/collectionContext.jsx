import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAuthContext } from "./authContext";

const CollectionContext = createContext();

export const useCollectionContext = () => useContext(CollectionContext);

export const CollectionContextProvider = ({ children }) => {

    const { session } = useAuthContext();
    const [collections, setCollections] = useState([]);
    const [collection, setCollection] = useState({ name: "", emoji: "", description: ""});


    const createCollection = async (e) => {
        e.preventDefault();
        // Logic to create a new collection
        const { error, data } = await supabase
        .from('collections')
        .insert({ name: collection.name, emoji: collection.emoji, description: collection.description, user_id: session.user.id })
        .select()
        .single();

        if (error) {
            console.error("Supabase error:", error);
            return;
        }
        setCollections(prev => [...prev, data]);
        setCollection({ name: "", emoji: "", description: "" });

    }

    const fetchCollections = async() => {
        // Fetch collections logic (if needed)
        console.log(session)
        const { data, error } = await supabase
        .from('collections')
        .select(`*, vocabularies (*)`)
        .eq('user_id', session.user.id);

        if (error) {
            console.error("Supabase error:", error);
            return;
        }
        setCollections(data);
    }


    return (
        <CollectionContext.Provider value={{ collections, createCollection, collection, setCollection, fetchCollections }}>
            { children }
        </CollectionContext.Provider>
    )

} 

