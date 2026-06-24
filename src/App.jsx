import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthScreen from "./components/AuthScreen";
import LevelSelect from "./components/LevelSelect";
import Quiz from "./components/Quiz";
import "./App.css";

function AppInner() {
  const { user, loading, supabaseConfigured } = useAuth();
  const [level, setLevel] = useState(null);

  if (loading) return <div className="loading-screen">Loading...</div>;

  // If Supabase isn't configured, skip straight past auth so the app is
  // still fully click-throughable during development.
  if (!user && supabaseConfigured) {
    return <AuthScreen />;
  }

  if (!level) {
    return <LevelSelect onSelectLevel={setLevel} />;
  }

  return <Quiz level={level} onBackToLevels={() => setLevel(null)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
