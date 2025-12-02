import React from "react";

export default function ShowVocabulary({
    title = "Example Vocabulary Title",
    description = "This is a sample description for the vocabulary item. Replace with real data.",
}) {
    return (
        <div style={styles.page}>
            <main style={styles.centerArea}>
                <div style={styles.card}>
                    <h1 style={styles.title}>{title}</h1>
                    <p style={styles.description}>{description}</p>
                </div>
            </main>

            <footer style={styles.footer}>
                <button aria-label="icon-1" style={styles.iconButton}>
                    {/* Star icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M12 17.3L5.6 20l1.1-6.4L2.5 9.6l6.5-.9L12 3l3 5.7 6.5.9-4.2 3.9L18.4 20 12 17.3z" fill="currentColor"/>
                    </svg>
                </button>

                <button aria-label="icon-2" style={styles.iconButton}>
                    {/* Pencil / Edit icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                    </svg>
                </button>

                <button aria-label="icon-3" style={styles.iconButton}>
                    {/* Trash icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                    </svg>
                </button>

                <button aria-label="icon-4" style={styles.iconButton}>
                    {/* Share icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.2 3.2 0 0 0 0-1.4l7.02-4.11A2.99 2.99 0 1 0 15 5a2.99 2.99 0 0 0 .96 2.24L8.94 11.3a3 3 0 1 0 0 1.4l7.02 4.11A2.99 2.99 0 1 0 18 16.08z" fill="currentColor"/>
                    </svg>
                </button>
            </footer>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f7fb",
        color: "#111827",
        fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif",
    },
    centerArea: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
    },
    card: {
        textAlign: "center",
        maxWidth: 800,
        width: "100%",
        padding: "48px 32px",
        borderRadius: 12,
        background: "white",
        boxShadow: "0 6px 18px rgba(16,24,40,0.08)",
    },
    title: {
        margin: 0,
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.1,
    },
    description: {
        marginTop: "12px",
        color: "#6b7280",
        fontSize: "1rem",
    },
    footer: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 20,
        display: "flex",
        justifyContent: "center",
        gap: 16,
        pointerEvents: "auto",
    },
    iconButton: {
        background: "white",
        border: "none",
        padding: 12,
        borderRadius: 999,
        boxShadow: "0 4px 10px rgba(16,24,40,0.08)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#374151",
    },
};