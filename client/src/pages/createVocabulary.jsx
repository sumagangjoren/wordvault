import supabase from "../supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateVocabulary() {

    const navigate = useNavigate();
    const [createVocabulary, setCreateVocabulary] = useState({ word: "", definition: "", type: "" });

    const handleSave = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.from('vocabularies').insert([
            {
                word: createVocabulary.word,
                definition: createVocabulary.definition,
                type: createVocabulary.type
            }
        ])

        if(error) {
            console.error("Error inserting vocabulary:", error);
        } else {
            navigate('/vocabularies');
        }

    }

    const styles = {
        page: { minHeight: "100vh", display: "flex", flexDirection: "column", padding: 20, boxSizing: "border-box" },
        header: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
        backBtn: { padding: "6px 10px", cursor: "pointer", border: "1px solid #ccc", borderRadius: 6, background: "#fff" },
        titleBlock: { display: "flex", flexDirection: "column" },
        title: { textTransform: "lowercase", fontSize: 20, fontWeight: 600, margin: 0 },
        subtitle: { marginTop: 6, color: "#666", fontSize: 14 },
        form: { display: "flex", flexDirection: "column", gap: 12, flex: 1 },
        input: { padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ddd", outline: "none" },
        textarea: { padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ddd", outline: "none", minHeight: 140, resize: "vertical" },
        saveWrap: { paddingTop: 12 },
        saveBtn: { width: "100%", padding: 14, fontSize: 16, borderRadius: 8, border: "none", background: "green", color: "#fff", cursor: "pointer" }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                {/* <button type="button" aria-label="Go back" style={styles.backBtn}>
                    ←
                </button> */}
                <div style={styles.titleBlock}>
                    <h1 style={styles.title}>add new</h1>
                    <div style={styles.subtitle}>add your own word.</div>
                </div>
            </header>

            <form style={styles.form}>
                <input
                    style={styles.input}
                    placeholder="word"
                    autoFocus
                    value={createVocabulary.word}
                    onChange={(e) => setCreateVocabulary({ ...createVocabulary, word: e.target.value })}
                />

                <textarea
                    style={styles.textarea}
                    placeholder="definition"
                    value={createVocabulary.definition}
                    onChange={(e) => setCreateVocabulary({ ...createVocabulary, definition: e.target.value })}
                />

                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-md bg-green-200 text-center" onClick={() => setCreateVocabulary({...createVocabulary, type: "verb"})}>Verb</div>
                    <div className="rounded-md bg-green-200 text-center" onClick={() => setCreateVocabulary({...createVocabulary, type: "noun"})}>Noun</div>
                    <div className="rounded-md bg-green-200 text-center" onClick={() => setCreateVocabulary({...createVocabulary, type: "adjective"})}> Adjective</div>
                </div>

                <div style={styles.saveWrap}>
                    <button type="submit" style={styles.saveBtn} onClick={handleSave}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateVocabulary;