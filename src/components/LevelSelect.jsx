import { useAuth } from "../context/AuthContext";

const LEVELS = [
  {
    key: "beginner",
    label: "Beginner",
    color: "#1A5F7A",
    description: "Vocabulary, basic pronouns, present-tense verbs. English shown throughout.",
  },
  {
    key: "intermediate",
    label: "Intermediate",
    color: "#B85C38",
    description: "Past & future tense, possession, negation, medium-length sentences. English fades out as you improve, or toggle it off yourself.",
  },
  {
    key: "advanced",
    label: "Advanced",
    color: "#6B4226",
    description: "Relative clauses, multi-part connectors, passive voice and impersonal forms, long sentences. Arabic-only, with bilingual explanations.",
  },
];

export default function LevelSelect({ onSelectLevel }) {
  const { user, signOut } = useAuth();

  return (
    <div className="level-select">
      <div className="level-select-header">
        <h1>Choose Your Level</h1>
        {user && <p className="subtitle">Signed in as {user.email}</p>}
        <button className="link-button" onClick={signOut}>
          Sign out
        </button>
      </div>

      <div className="level-cards">
        {LEVELS.map((lvl) => (
          <button
            key={lvl.key}
            className="level-card"
            style={{ borderColor: lvl.color }}
            onClick={() => onSelectLevel(lvl.key)}
          >
            <span className="level-card-badge" style={{ background: lvl.color }}>
              {lvl.label.toUpperCase()}
              {lvl.comingSoon && " — COMING SOON"}
            </span>
            <p>{lvl.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
