import supabase from "../supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateVocabulary() {

    const navigate = useNavigate();
    const [createVocabulary, setCreateVocabulary] = useState({ word: "", definition: "", type: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    // const handleSave = async (e) => {
    //     e.preventDefault();

    //     const { data, error } = await supabase.from('vocabularies').insert([
    //         {
    //             word: createVocabulary.word,
    //             definition: createVocabulary.definition,
    //             type: createVocabulary.type
    //         }
    //     ])

    //     if(error) {
    //         console.error("Error inserting vocabulary:", error);
    //     } else {
    //         navigate('/vocabularies');
    //     }

    // }

    const styles = {
        page: { minHeight: "100vh", display: "flex", flexDirection: "column", padding: 20 },
        header: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
        titleBlock: { display: "flex", flexDirection: "column" },
        title: { textTransform: "lowercase", fontSize: 20, fontWeight: 600, margin: 0 },
        subtitle: { marginTop: 6, color: "#666", fontSize: 14 },
        form: { display: "flex", flexDirection: "column", gap: 12, flex: 1 },
        input: { padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ddd" },
        textarea: { padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ddd", minHeight: 140 },
        saveWrap: { paddingTop: 12 },
        saveBtn: {
            width: "100%",
            padding: 14,
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            background: loading ? "#9ca3af" : "green",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer"
        },
        error: {
            color: "#b91c1c",
            background: "#fee2e2",
            padding: 10,
            borderRadius: 6,
            fontSize: 14
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        // 🧪 Client-side validation
        if (!createVocabulary.word.trim()) {
            setErrorMessage("Word is required.");
            return;
        }

        if (!createVocabulary.definition.trim()) {
            setErrorMessage("Definition is required.");
            return;
        }

        if (!createVocabulary.type) {
            setErrorMessage("Please select a word type.");
            return;
        }

        try {
            setLoading(true);

            const { error } = await supabase
                .from("vocabularies")
                .insert([
                    {
                        word: createVocabulary.word.trim(),
                        definition: createVocabulary.definition.trim(),
                        type: createVocabulary.type
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

            <form style={styles.form} onSubmit={handleSave}>
                {errorMessage && <div style={styles.error}>{errorMessage}</div>}
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
                    {["verb", "noun", "adjective"].map((t) => (
                        <div
                            key={t}
                            onClick={() =>
                                setCreateVocabulary({ ...createVocabulary, type: t })
                            }
                            className={`rounded-md text-center cursor-pointer p-2 ${createVocabulary.type === t
                                    ? "bg-green-500 text-white"
                                    : "bg-green-200"
                                }`}
                        >
                            {t}
                        </div>
                    ))}
                </div>

                <div style={styles.saveWrap}>
                    <button type="submit" style={styles.saveBtn} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateVocabulary;