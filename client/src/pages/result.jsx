import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

// /c:/Users/Sumagang/Documents/projects/wordvault/client/src/pages/result.jsx

/*
Expected incoming state from quiz page (location.state):
{
    results: [
        {
            id: 1,
            word: "excitation",            // the word shown in the quiz (or user's picked)
            chosen: "excitation",          // what user picked
            correct: "reparation",         // correct word
            chosenDefinition: "def of excitation",
            correctDefinition: "def of reparation"
        },
        ...
    ]
}

If no state is provided this page renders with mock data so you can see layout.
*/

const CircleProgress = ({ correct, total, size = 120, stroke = 10 }) => {
    const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage / 100);

    return (
        <div style={{ width: size, height: size, position: "relative" }}>
            <svg width={size} height={size}>
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e6e6e6"
                    strokeWidth={stroke}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#grad)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>

            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: size,
                    height: size,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
                }}
            >
                <div style={{ fontSize: 20, fontWeight: 700 }}>{correct}/{total}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{percentage}%</div>
            </div>
        </div>
    );
};

const IconCheck = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconCross = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Result() {
    const { state } = useLocation();
    const results = state?.results ?? [
        // mock fallback
        {
            id: 1,
            word: "excitation",
            chosen: "excitation",
            correct: "excitation",
            chosenDefinition: "The action of exciting; stimulation.",
            correctDefinition: "The action of exciting; stimulation.",
        },
        {
            id: 2,
            word: "ventilate",
            chosen: "ventilate",
            correct: "venerate",
            chosenDefinition: "To cause air to circulate.",
            correctDefinition: "To regard with great respect; revere.",
        },
        {
            id: 3,
            word: "obscure",
            chosen: "obscure",
            correct: "obscure",
            chosenDefinition: "Not discovered or known; uncertain.",
            correctDefinition: "Not discovered or known; uncertain.",
        },
    ];

    const summary = useMemo(() => {
        const total = results.length;
        const correctCount = results.reduce((acc, r) => acc + (r.chosen === r.correct ? 1 : 0), 0);
        return { total, correctCount };
    }, [results]);

    return (
        <div style={{ padding: 24, maxWidth: 840, margin: "0 auto", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>Quiz Result</h2>
                <p style={{ marginTop: 8, color: "#555" }}>Review your answers below</p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <CircleProgress correct={summary.correctCount} total={summary.total} />
            </div>

            <div style={{ display: "grid", gap: 12 }}>
                {results.map((r) => {
                    const isCorrect = r.chosen === r.correct;
                    return (
                        <div
                            key={r.id}
                            style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: 8,
                                padding: 12,
                                background: "#fff",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                <div style={{ fontWeight: 700 }}>{r.word}</div>
                                <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 13 }}>
                                    {isCorrect ? "Correct" : "Incorrect"}
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {!isCorrect && (
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 8, borderRadius: 6, background: "#fff7f7" }}>
                                        <div style={{ marginTop: 2 }}><IconCross /></div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Your answer: {r.chosen}</div>
                                            <div style={{ color: "#6b7280", marginTop: 4 }}>{r.chosenDefinition}</div>
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 8, borderRadius: 6, background: "#f7fffb" }}>
                                    <div style={{ marginTop: 2 }}><IconCheck /></div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{isCorrect ? "Correct answer" : "Correct answer: " + r.correct}</div>
                                        <div style={{ color: "#6b7280", marginTop: 4 }}>{r.correctDefinition}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
                <Link to="/" style={{ padding: "8px 14px", background: "#06b6d4", color: "#fff", borderRadius: 6, textDecoration: "none" }}>
                    Retake Quiz
                </Link>
                <Link to="/library" style={{ padding: "8px 14px", background: "#f3f4f6", color: "#111827", borderRadius: 6, textDecoration: "none" }}>
                    Review Library
                </Link>
            </div>
        </div>
    );
}