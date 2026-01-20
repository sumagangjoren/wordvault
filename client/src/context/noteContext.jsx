import { createContext, useContext } from "react";
import supabase from "../supabaseClient";
import { useState } from "react";

const NoteContext = createContext();
export const useNoteContext = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {

    const [notes, setNotes]= useState([]);
    const [note, setNote] = useState(null);

    const fetchNotes = async () => {
        const { data, error } = await supabase
        .from('notes')
        .select()

        if(!error) {
            setNotes(data)
        }
    }

    return (
        <NoteContext.Provider value={{notes, fetchNotes, note, setNote}}>
            { children }
        </NoteContext.Provider>
    )

}
