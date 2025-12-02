import { useNavigate } from "react-router";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const styles = {
        page: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            padding: "24px",
        },
        card: {
            width: "100%",
            maxWidth: 420,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(2,6,23,0.2)",
            padding: "28px",
            boxSizing: "border-box",
        },
        header: {
            marginBottom: 18,
            textAlign: "center",
        },
        title: {
            margin: 0,
            fontSize: 22,
            color: "#222",
        },
        subtitle: {
            margin: "6px 0 0",
            fontSize: 13,
            color: "#666",
        },
        form: {
            display: "grid",
            gap: 12,
            marginTop: 18,
        },
        label: {
            fontSize: 13,
            color: "#333",
            marginBottom: 6,
            display: "block",
        },
        input: {
            width: "100%",
            padding: "12px 14px",
            fontSize: 14,
            borderRadius: 8,
            border: "1px solid #e6e9ef",
            outline: "none",
            boxSizing: "border-box",
        },
        passwordRow: {
            display: "flex",
            alignItems: "center",
            gap: 8,
        },
        revealBtn: {
            fontSize: 12,
            padding: "8px 10px",
            border: "none",
            background: "transparent",
            color: "#6b6b6b",
            cursor: "pointer",
        },
        lowRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
        },
        checkboxLabel: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "#555",
        },
        link: {
            fontSize: 13,
            color: "#5b6df6",
            textDecoration: "none",
            cursor: "pointer",
        },
        primaryBtn: {
            width: "100%",
            padding: "12px 14px",
            background: "linear-gradient(90deg,#5b6df6,#667eea)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(101,108,234,0.28)",
        },
        altRow: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
            justifyContent: "center",
            color: "#9aa0b4",
            fontSize: 13,
        },
        ghostBtn: {
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #e6e9ef",
            background: "white",
            cursor: "pointer",
            fontSize: 13,
        },
        signupRow: {
            marginTop: 14,
            textAlign: "center",
            fontSize: 14,
            color: "#444",
        },
        signupBtn: {
            marginLeft: 8,
            border: "none",
            background: "transparent",
            color: "#5b6df6",
            fontWeight: 600,
            cursor: "pointer",
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // UI only - don't send anything
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Welcome back</h2>
                    <p style={styles.subtitle}>Sign in to access your WordVault</p>
                </div>

                <form style={styles.form} onSubmit={handleSubmit} aria-label="Login form">
                    <div>
                        <label htmlFor="username" style={styles.label}>
                            Username or Email
                        </label>
                        <input id="username" name="username" style={styles.input} placeholder="you@example.com" />
                    </div>

                    <div>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <div style={styles.passwordRow}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                style={{ ...styles.input, margin: 0 }}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((s) => !s)}
                                style={styles.revealBtn}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div style={styles.lowRow}>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" aria-label="remember me" />
                            Remember me
                        </label>
                        <a style={styles.link} href="#" onClick={(e) => e.preventDefault()}>
                            Forgot?
                        </a>
                    </div>

                    <button type="submit" style={styles.primaryBtn}>
                        Sign in
                    </button>

                    <div style={styles.altRow}>
                        <span>or continue with</span>
                        <button type="button" style={styles.ghostBtn} aria-label="Sign in with Google">
                            Google
                        </button>
                        <button type="button" style={styles.ghostBtn} aria-label="Sign in with GitHub">
                            GitHub
                        </button>
                    </div>

                    <div style={styles.signupRow}>
                        New here?
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            style={styles.signupBtn}
                        >
                            Create an account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;