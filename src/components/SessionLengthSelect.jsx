import { useState } from "react";

const PRESETS = [10, 20, 30];

export default function SessionLengthSelect({ level, onStart, onBack }) {
  const [customValue, setCustomValue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  function handlePreset(n) {
    onStart(n);
  }

  function handleCustomSubmit(e) {
    e.preventDefault();
    const n = parseInt(customValue, 10);
    if (Number.isFinite(n) && n > 0) {
      onStart(n);
    }
  }

  return (
    <div className="session-length-select">
      <button className="link-button" onClick={onBack}>
        ← Back to levels
      </button>
      <h2>How many questions this session?</h2>
      <p className="subtitle">
        {level.charAt(0).toUpperCase() + level.slice(1)} level
      </p>

      <div className="session-length-presets">
        {PRESETS.map((n) => (
          <button key={n} className="session-length-preset" onClick={() => handlePreset(n)}>
            {n} questions
          </button>
        ))}
        <button
          className="session-length-preset session-length-other"
          onClick={() => setShowCustomInput(true)}
        >
          Other
        </button>
      </div>

      {showCustomInput && (
        <form className="session-length-custom" onSubmit={handleCustomSubmit}>
          <input
            type="number"
            min="1"
            placeholder="Enter a number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            autoFocus
          />
          <button type="submit" className="next-button">
            Start
          </button>
        </form>
      )}
    </div>
  );
}
