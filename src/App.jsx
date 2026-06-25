import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthScreen from "./components/AuthScreen";
import LevelSelect from "./components/LevelSelect";
import SessionLengthSelect from "./components/SessionLengthSelect";
import Quiz from "./components/Quiz";
import "./App.css";

function AppInner() {
  const { user, loading, supabaseConfigured } = useAuth();
  const [level, setLevel] = useState(null);
  const [sessionLength, setSessionLength] = useState(null);

  if (loading) return <div className="loading-screen">Loading...</div>;

  // If Supabase isn't configured, skip straight past auth so the app is
  // still fully click-throughable during development.
  if (!user && supabaseConfigured) {
    return <AuthScreen />;
  }

  if (!level) {
    return (
      <LevelSelect
        onSelectLevel={(lvl) => {
          setLevel(lvl);
          setSessionLength(null);
        }}
      />
    );
  }

  if (!sessionLength) {
    return (
      <SessionLengthSelect
        level={level}
        onStart={setSessionLength}
        onBack={() => setLevel(null)}
      />
    );
  }

  return (
    <Quiz
      level={level}
      sessionLength={sessionLength}
      onBackToLevels={() => {
        setLevel(null);
        setSessionLength(null);
      }}
      onAdvanceLevel={(lvl) => {
        setLevel(lvl);
        setSessionLength(null);
      }}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
