import React, { useMemo, useState } from "react";

/**
 * Quiz page component
 * File: /c:/Users/Sumagang/Documents/projects/wordvault/client/src/pages/quiz.jsx
 *
 * - Top: progress percentage bar
 * - Middle: definition displayed
 * - Below: three choice buttons
 * - After selecting: sliding dialog up showing title (word), the definition,
 *   whether the user's pick was correct, and a Next/Finish button
 *
 * Self-contained example data and styles. Replace `questions` with real data as needed.
 */

export default function Quiz() {
    const questions = useMemo(
        () => [
            { word: "aberration", definition: "A deviation from what is normal or expected." },
            { word: "laconic", definition: "Using very few words; concise." },
            { word: "obdurate", definition: "Stubbornly refusing to change one's opinion." },
            { word: "pellucid", definition: "Clear in meaning or style; easily understood." },
            { word: "sagacious", definition: "Having or showing keen mental discernment and good judgment." },
            { word: "ubiquitous", definition: "Present, appearing, or found everywhere." },
        ],
        []
    );

    const total = questions.length;
    const [index, setIndex] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    // create 3 choices: correct + two others
    const choices = useMemo(() => {
        if (!questions[index]) return [];
        const correct = questions[index].word;
        const others = questions
            .map((q) => q.word)
            .filter((w) => w !== correct)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);
        const all = [correct, ...others].sort(() => 0.5 - Math.random());
        return all;
    }, [index, questions]);

    const handleChoice = (word) => {
        if (showDialog) return;
        const correctWord = questions[index].word;
        const correct = word === correctWord;
        setSelected(word);
        setIsCorrect(correct);
        setShowDialog(true);
    };

    const handleNext = () => {
        if (index + 1 >= total) {
            // finished - reset or navigate away as needed
            setIndex(0);
        } else {
            setIndex((i) => i + 1);
        }
        // reset selection/dialog
        setSelected(null);
        setShowDialog(false);
        setIsCorrect(false);
    };

    const percent = Math.round((index / total) * 100);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.progressWrap}>
                    <div style={styles.progressLabel}>
                        Progress: {percent}% ({index}/{total})
                    </div>
                    <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${percent}%` }} />
                    </div>
                </div>

                <div style={styles.card}>
                    <div style={styles.definitionLabel}>Definition</div>
                    <div style={styles.definitionText}>{questions[index].definition}</div>

                    <div style={styles.choices}>
                        {choices.map((c) => {
                            const disabled = !!selected;
                            const picked = selected === c;
                            const revealCorrect = showDialog && c === questions[index].word;
                            return (
                                <button
                                    key={c}
                                    onClick={() => handleChoice(c)}
                                    disabled={disabled}
                                    style={{
                                        ...styles.choiceBtn,
                                        opacity: disabled && !picked && !revealCorrect ? 0.6 : 1,
                                        borderColor: picked && isCorrect ? "#2ecc71" : picked && !isCorrect ? "#e74c3c" : "#ccc",
                                        background: picked ? (isCorrect ? "#2ecc71" : "#fdd") : "#fff",
                                    }}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div
                aria-hidden={!showDialog}
                style={{
                    ...styles.dialogWrap,
                    transform: showDialog ? "translateY(0)" : "translateY(110%)",
                    pointerEvents: showDialog ? "auto" : "none",
                }}
            >
                <div style={styles.dialog}>
                    <div style={styles.dialogHeader}>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>
                            {isCorrect ? "Correct!" : "Incorrect"}
                        </div>
                        <div style={{ color: "#666", fontSize: 13 }}>
                            The right word:
                        </div>
                    </div>

                    <div style={styles.dialogContent}>
                        <div style={styles.dialogWord}>{questions[index].word}</div>
                        <div style={styles.dialogDef}>{questions[index].definition}</div>
                        <div style={{ marginTop: 10, color: isCorrect ? "#2ecc71" : "#e74c3c", fontWeight: 600 }}>
                            {isCorrect ? "You selected the right word." : `You selected: ${selected}`}
                        </div>
                    </div>

                    <div style={styles.dialogActions}>
                        <button onClick={handleNext} style={styles.nextBtn}>
                            {index + 1 >= total ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            </div>

            {/* minimal styles */}
            <style>{`
                /* Focus outlines for keyboard users */
                button:focus { outline: 3px solid #9bd3ff; outline-offset: 2px; }
            `}</style>
        </div>
    );
}

const styles = {
    page: {
        fontFamily: "Inter, Roboto, sans-serif",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 32,
        background: "#f6f8fa",
    },
    container: {
        width: 720,
        maxWidth: "94%",
    },
    progressWrap: {
        marginBottom: 20,
    },
    progressLabel: {
        marginBottom: 6,
        color: "#333",
        fontSize: 14,
    },
    progressBar: {
        height: 10,
        background: "#e9ecef",
        borderRadius: 999,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        background: "linear-gradient(90deg,#60a5fa,#7c3aed)",
        borderRadius: 999,
        transition: "width 300ms ease",
    },
    card: {
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 6px 20px rgba(16,24,40,0.06)",
    },
    definitionLabel: {
        color: "#666",
        fontSize: 13,
        marginBottom: 6,
    },
    definitionText: {
        fontSize: 18,
        marginBottom: 18,
        color: "#111827",
    },
    choices: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
    },
    choiceBtn: {
        padding: "12px 10px",
        borderRadius: 8,
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
        fontSize: 15,
        textAlign: "center",
        transition: "all 180ms",
        userSelect: "none",
    },
    dialogWrap: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        transition: "transform 300ms cubic-bezier(.2,.9,.2,1)",
        zIndex: 60,
        padding: 20,
    },
    dialog: {
        width: 720,
        maxWidth: "94%",
        background: "#fff",
        borderRadius: 12,
        padding: 18,
        boxShadow: "0 18px 40px rgba(2,6,23,0.2)",
    },
    dialogHeader: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginBottom: 8,
    },
    dialogContent: {
        borderTop: "1px solid #f0f0f0",
        paddingTop: 12,
    },
    dialogWord: {
        fontSize: 20,
        fontWeight: 700,
        color: "#111827",
    },
    dialogDef: {
        marginTop: 6,
        color: "#374151",
    },
    dialogActions: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 12,
    },
    nextBtn: {
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 15,
    },
};