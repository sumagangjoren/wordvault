
function EditVocabulary() {
    

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
                    <h1 style={styles.title}>Edit</h1>
                    <div style={styles.subtitle}>edit your own word.</div>
                </div>
            </header>

            <form style={styles.form}>
                <input
                    style={styles.input}
                    placeholder="word"
                    autoFocus
                />

                <textarea
                    style={styles.textarea}
                    placeholder="definition"
                />

                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-md bg-green-200 text-center">Verb</div>
                    <div className="rounded-md bg-green-200 text-center">Noun</div>
                    <div className="rounded-md bg-green-200 text-center">Adjective</div>
                </div>

                <div style={styles.saveWrap}>
                    <button type="submit" style={styles.saveBtn}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditVocabulary;
