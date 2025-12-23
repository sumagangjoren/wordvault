import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";

const VocabularyContext = createContext();

export const useVocabularyContext = () => useContext(VocabularyContext)

export const VocabularyContextProvider = ({ children }) => {
    const [vocabularies, setVocabularies] = useState([]);

    const fetchVocabularies = async () => {
        const { data, error } = await supabase
            .from('vocabularies')
            .select('*');
        if (!error) {
            setVocabularies(data);
        }
    };


    return (
        <VocabularyContext.Provider value={{ vocabularies, fetchVocabularies, setVocabularies }}>
            {children}
        </VocabularyContext.Provider>
    )

}