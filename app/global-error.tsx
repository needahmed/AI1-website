"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
            500
          </h1>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Something Went Wrong
          </h2>
          <p style={{ marginBottom: "2rem", color: "#666" }}>
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
