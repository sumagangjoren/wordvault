import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useAuthContext } from "./authContext";

const VocabularyContext = createContext();

export const useVocabularyContext = () => useContext(VocabularyContext)

export const VocabularyContextProvider = ({ children }) => {

    const { session } = useAuthContext();
    const [vocabularies, setVocabularies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [vocabulary, setVocabulary] = useState({ word: "", definition: "", partOfSpeech: "" });

    const fetchVocabularies = async () => {
         if (!session) {
            setVocabularies([]); // no user => empty list (or fetch public/demo if you want)
            return;
        }

        const { data, error } = await supabase
            .from('vocabularies')
            .select('*');
        if (!error) {
            setVocabularies(data);
        }
        console.log('fetching vocabularies');
        console.log('Fetched vocabularies:', data);
    };

    useEffect(() => {
        fetchVocabularies();
    }, [session]);

    const deleteVocabulary = (id) => {
        setVocabularies(prev => prev.filter(v => v.id !== id));
    };

    const createVocabulary = async (e) => {
        console.log('creating vocabulary...');
        e.preventDefault();
        setErrorMessage(null);

        // 🧪 Client-side validation
        if (!vocabulary.word.trim()) {
            setErrorMessage("Word is required.");
            return;
        }

        if (!vocabulary.definition.trim()) {
            setErrorMessage("Definition is required.");
            return;
        }

        // if (!vocabulary.type) {
        //     setErrorMessage("Please select a word type.");
        //     return;
        // }

        try {
            setLoading(true);

            const { error } = await supabase
                .from("vocabularies")
                .insert([
                    {
                        word: vocabulary.word.trim(),
                        definition: vocabulary.definition.trim(),
                        partOfSpeech: vocabulary.partOfSpeech
                    }
                ]);

            if (error) {
                console.error("Supabase error:", error);
                setErrorMessage(error.message);
                return;
            }

            navigate("/vocabularies");
        } catch (err) {
            console.error("Unexpected error:", err);
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const updateVocabulary = async (e) => {
        e.preventDefault();
        console.log("updating vocabulary...");
    }


    return (
        <VocabularyContext.Provider value={{ vocabularies, fetchVocabularies, updateVocabulary, setVocabularies, deleteVocabulary, createVocabulary, loading, errorMessage, setErrorMessage, vocabulary, setVocabulary }}>
            {children}
        </VocabularyContext.Provider>
    )

}