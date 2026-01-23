import { createContext, useContext } from "react";
import supabase from "../supabaseClient";
import { useState } from "react";
import { useAuthContext } from "./authContext";

const NoteContext = createContext();
export const useNoteContext = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {

    const { session } = useAuthContext()
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({ title: '', content: '', id: null });

    const fetchNotes = async () => {
        const { data, error } = await supabase
            .from('notes')
            .select()
            .eq('user_id', session.user.id)

        if (!error) {
            setNotes(data)
        }
    }

    const createNote = async (e) => {



        console.log('creating note...', e);
        console.log(note);
        e.preventDefault();
        // setErrorMessage(null);
        // 🧪 Client-side validation
        if (!note.title.trim()) {
            // setErrorMessage("Word is required.");
            console.error("Title is required.")
            return;
        }

        try {
            const { error, data } = await supabase
                .from("notes")
                .insert([
                    {
                        title: note.title,
                        content: note.content,
                        user_id: session.user.id,
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error("Supabase error:", error);
                return;
            }

            setNotes(prev => [data, ...prev]);
            setNote({ title: "", content: "", id: null });
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    const updateNote = async (e) => {
        e.preventDefault();
        // setErrorMessage(null);
        console.log('updating note...', note);
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
                    content: note.content,
                })
                .eq('id', note.id)
                .select()
                .single()

            if (error) {
                // setErrorMessage(error.message);
                console.log(error.message);
                return;
            }

            console.log(data)

            setNotes(prev => prev.map(note => (note.id === data.id ? data : note)));
            setNote({ title: "", content: "", id: null });
        } catch (err) {
            console.error(err);
            // setErrorMessage("Failed to update vocabulary.");
        }
    }

    const deleteNote = async (id) => {

        try {
            const { error } = await supabase.from('notes').delete().eq('id', id);
            if (error) {
                console.error("Supabase error:", error);
                return;
            }

            setNotes(prev => prev.filter(n => n.id !== id));
        }
        catch (err) {
            console.error(err)
        }

    }

    return (
        <NoteContext.Provider value={{ notes, fetchNotes, note, setNote, createNote, updateNote, deleteNote }}>
            {children}
        </NoteContext.Provider>
    )

}
