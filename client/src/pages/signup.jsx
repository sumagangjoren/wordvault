import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Basic client-side validators (frontend only)
  const usernameValid = username.trim().length >= 3;
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8;
  const passwordsMatch = password === confirm && confirm !== "";
  const formValid =
    usernameValid && emailValid && passwordValid && passwordsMatch && agreed;

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend call — pure frontend design. Show success state only.
    if (!formValid) return;
    setSubmitted(true);
  };

  return (
    <div className="signup-root">
      <style>{`
        .signup-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7ff 0%, #e9f0ff 100%);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          padding: 24px;
        }
        .card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 30px rgba(32, 41, 61, 0.08);
          padding: 28px;
          box-sizing: border-box;
        }
        .brand {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 8px;
        }
        .logo {
          width: 44px;
          height: 44px;
          background: linear-gradient(45deg,#6c5ce7,#00b894);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 18px;
        }
        h1 {
          margin: 4px 0 18px 0;
          font-size: 20px;
          line-height: 1.1;
        }
        form { display: grid; gap: 12px; }
        label {
          font-size: 13px;
          color: #344054;
          display: block;
          margin-bottom: 6px;
        }
        .field {
          display: flex;
          flex-direction: column;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e6e9ee;
          font-size: 14px;
          outline: none;
          transition: box-shadow .12s, border-color .12s;
        }
        input:focus {
          border-color: #7c5cff;
          box-shadow: 0 0 0 4px rgba(124,92,255,0.06);
        }
        .row {
          display: flex;
          gap: 10px;
        }
        .small {
          font-size: 12px;
          color: #667085;
        }
        .validation {
          color: #ef4444;
          font-size: 12px;
          margin-top: 6px;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .btn {
          padding: 10px 14px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }
        .btn-primary {
          background: linear-gradient(90deg,#6c5ce7,#00b894);
          color: white;
          box-shadow: 0 6px 18px rgba(108,92,231,0.14);
        }
        .btn-primary:disabled {
          opacity: 0.56;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn-ghost {
          background: transparent;
          color: #344054;
          border: 1px solid transparent;
        }
        .muted {
          color: #98a0b3;
          font-size: 13px;
          margin-top: 6px;
        }
        .success {
          text-align: center;
          padding: 22px;
          background: linear-gradient(180deg, #f7fffa, #f1fff6);
          border: 1px solid #e6f6ec;
          border-radius: 10px;
        }
        @media (max-width: 480px) {
          .card { padding: 18px; }
        }
      `}</style>

      <div className="card" role="region" aria-labelledby="signup-title">
        <div className="brand">
          <div className="logo">WV</div>
          <div>
            <div style={{ fontSize: 13, color: "#101828", fontWeight: 700 }}>
              WordVault
            </div>
            <div style={{ fontSize: 12, color: "#667085" }}>Create your account</div>
          </div>
        </div>

        <h1 id="signup-title">Sign up</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. alex99"
                aria-invalid={!usernameValid && username !== ""}
              />
              {!usernameValid && username !== "" && (
                <div className="validation">Username must be at least 3 characters.</div>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!emailValid && email !== ""}
              />
              {!emailValid && email !== "" && (
                <div className="validation">Enter a valid email address.</div>
              )}
            </div>

            <div className="row">
              <div style={{ flex: 1 }} className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  aria-invalid={!passwordValid && password !== ""}
                />
                {!passwordValid && password !== "" && (
                  <div className="validation">Password must be 8+ characters.</div>
                )}
              </div>

              <div style={{ flex: 1 }} className="field">
                <label htmlFor="confirm">Confirm</label>
                <input
                  id="confirm"
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                  aria-invalid={!passwordsMatch && confirm !== ""}
                />
                {!passwordsMatch && confirm !== "" && (
                  <div className="validation">Passwords do not match.</div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                id="show"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="show" className="small">Show password</label>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="agree" className="small">
                I agree to the <span style={{ color: "#0B6E4F" }}>Terms</span> and{" "}
                <span style={{ color: "#0B6E4F" }}>Privacy Policy</span>.
              </label>
            </div>

            <div className="controls" style={{ marginTop: 6 }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formValid}
                aria-disabled={!formValid}
              >
                Create account
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    // purely client navigation to login page
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="muted">We only store account data locally for this demo (no backend).</div>
          </form>
        ) : (
          <div className="success" role="status" aria-live="polite">
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>You're all set!</div>
            <div className="small" style={{ marginBottom: 12 }}>
              Your account was created locally (demo). You can continue to login.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;