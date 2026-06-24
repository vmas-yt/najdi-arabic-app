import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthScreen() {
  const { signUp, signIn, supabaseConfigured } = useAuth();
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUp(email, password);
        setInfo("Account created! Check your email to confirm, then sign in.");
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Speaking Najdi</h1>
        <p className="subtitle">Practice speaking Riyadh Arabic with confidence</p>

        {!supabaseConfigured && (
          <div className="notice notice-warn">
            Backend isn't connected yet, so sign-up/sign-in won't save anything
            real right now. You can still click through the demo below — set up
            Supabase to make accounts and progress persist.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>

          {error && <div className="notice notice-error">{error}</div>}
          {info && <div className="notice notice-success">{info}</div>}

          <button type="submit" disabled={busy}>
            {busy ? "Please wait..." : mode === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button
          className="link-button"
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
