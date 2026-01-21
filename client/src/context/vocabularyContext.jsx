import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useAuthContext } from "./authContext";
import { useCollectionContext } from "./collectionContext";
import { useNoteContext } from "./noteContext";

const VocabularyContext = createContext();

export const useVocabularyContext = () => useContext(VocabularyContext)

export const VocabularyContextProvider = ({ children }) => {

    const { session } = useAuthContext();
    const { fetchCollections,  } = useCollectionContext();
    const { fetchNotes } = useNoteContext();
    const [vocabularies, setVocabularies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [vocabulary, setVocabulary] = useState({ word: "", definition: "", partOfSpeech: "", example: "", id: null, collection_id: null });

    const fetchVocabularies = async () => {
         if (!session) {
            setVocabularies([]); // no user => empty list (or fetch public/demo if you want)
            return;
        }

        const { data, error } = await supabase
            .from('vocabularies')
            .select('*')
            .eq('user_id', session.user.id);

        if (!error) {
            setVocabularies(data);
        }
        fetchCollections();
        fetchNotes();
        console.log('Fetched vocabularies:', data);
    };

    useEffect(() => {
        fetchVocabularies();
        // console.log(session.user.id)
        
    }, [session?.user?.id]);

    const deleteVocabulary = async (id) => {
        const { error } = await supabase
        .from('vocabularies')
        .delete()
        .eq('id', id)
        
        if (error) {
            console.error("Supabase error:", error);
            return;
        }

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

        try {
            setLoading(true);

            const { error, data } = await supabase
                .from("vocabularies")
                .insert([
                    {
                        word: vocabulary.word.trim(),
                        definition: vocabulary.definition.trim(),
                        partOfSpeech: vocabulary.partOfSpeech,
                        example: vocabulary.example.trim(),
                        user_id: session.user.id,
                        collection_id: vocabulary.collection_id || null,
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error("Supabase error:", error);
                setErrorMessage(error.message);
                return;
            }

            setVocabularies(prev => [data, ...prev]);
            setVocabulary({ word: "", definition: "", partOfSpeech: "", example: "", collection_id: "", id: null });
        } catch (err) {
            console.error("Unexpected error:", err);
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const updateVocabulary = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!vocabulary.word.trim() || !vocabulary.definition.trim()) {
            setErrorMessage("Word and definition are required.");
            return;
        }

        console.log(vocabulary)
        try {
            const { data, error } = await supabase
            .from('vocabularies')
            .update({
                word: vocabulary.word.trim(),
                definition: vocabulary.definition.trim(),
                partOfSpeech: vocabulary.partOfSpeech,
                example: vocabulary.example.trim(),
                collection_id: vocabulary.collection_id || null,
            })
            .eq('id', vocabulary.id)
            .select()
            .single()

            if (error) {
                setErrorMessage(error.message);
                return;
            }

              setVocabularies(prev =>
                    prev.map(v => (v.id === data.id ? data : v))
                );
            setVocabulary({ word: "", definition: "", partOfSpeech: "", example: "", id: null, collection_id: null });
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to update vocabulary.");
        } finally {
            setLoading(false);
        }
    }

    const toggleFavorite = async (id) => {

        const vocab = vocabularies.find(v => v.id === id);
        if (!vocab) return;

        const { error } = await supabase
        .from('vocabularies')
        .update({ isFavorite: !vocab.isFavorite })
        .eq('id', id);

        if (error) {
            console.error("Supabase error:", error);
            return;
        }
        setVocabularies(prev => prev.map(v => v.id === id ? { ...v, isFavorite: !v.isFavorite } : v));
    }

    const resetVocabularyState = () => {
        setVocabularies([]);
        setVocabulary({ word: "", definition: "", partOfSpeech: "", example: "" });
        setErrorMessage(null);
        setLoading(false);
    };


    return (
        <VocabularyContext.Provider value={{ vocabularies, toggleFavorite, resetVocabularyState, fetchVocabularies, updateVocabulary, setVocabularies, deleteVocabulary, createVocabulary, loading, errorMessage, setErrorMessage, vocabulary, setVocabulary }}>
            {children}
        </VocabularyContext.Provider>
    )

}