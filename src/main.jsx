import React from "react";
import { createRoot } from "react-dom/client";

// Minimal placeholder app. The real UI will be dropped in from the
// Claude Design handoff — this just confirms the Vite + React build works.
function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#0e0e10",
        color: "#f5f5f5",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: 0 }}>
          KAT&nbsp;ZRT.
        </h1>
        <p style={{ opacity: 0.7, marginTop: "1rem" }}>
          Weboldal előkészület alatt — design handoff folyamatban.
        </p>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
