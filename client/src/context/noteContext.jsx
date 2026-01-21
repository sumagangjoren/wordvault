import { createContext, useContext } from "react";
import supabase from "../supabaseClient";
import { useState } from "react";
import { useAuthContext } from "./authContext";

const NoteContext = createContext();
export const useNoteContext = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {

    const { session } = useAuthContext()
    const [notes, setNotes]= useState([]);
    const [note, setNote] = useState({ title: '', content: '', id: null});

    const fetchNotes = async () => {
        const { data, error } = await supabase
        .from('notes')
        .select()

        if(!error) {
            setNotes(data)
        }
    }

    const createNote = async (e) => {
        console.log('creating note...');
        e.preventDefault();
        // setErrorMessage(null);
        // 🧪 Client-side validation
        if (!note.title.trim()) {
            // setErrorMessage("Word is required.");
            console.error("Title is required.")
            return;
        }

        try {
            // setLoading(true);

            const { error, data } = await supabase
                .from("notes")
                .insert([
                    {
                        title: note.title,
                        content: note.definition,
                        user_id: session.user.id,
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error("Supabase error:", error);
                // setErrorMessage(error.message);
                return;
            }

            setNotes(prev => [data, ...prev]);
            setNote({ title: "", content: "", id: null });
        } catch (err) {
            console.error("Unexpected error:", err);
            // setErrorMessage("Something went wrong. Please try again.");
        }
    }

    const updateNote = async (e) => {
        e.preventDefault();
        // setErrorMessage(null);

        if (!note.title.trim()) {
            // setErrorMessage("Title is required.");
            console.error("Title is required.")
            return;
        }

        try {
            const { data, error } = await supabase
            .from('notes')
            .update({
                title: note.title,
                content: note.definition,
            })
            .eq('id', note.id)
            .select()
            .single()

            if (error) {
                // setErrorMessage(error.message);
                console.log(error.message);
                return;
            }

              setNotes(prev =>
                    prev.map(note => (note.id === data.id ? data : note))
                );
            setNotes({ title: "", content: "", id: null });
        } catch (err) {
            console.error(err);
            // setErrorMessage("Failed to update vocabulary.");
        }
    }

    return (
        <NoteContext.Provider value={{notes, fetchNotes, note, setNote, createNote, updateNote}}>
            { children }
        </NoteContext.Provider>
    )

}
