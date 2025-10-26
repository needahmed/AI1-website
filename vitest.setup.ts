import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
Object.defineProperty(process.env, "NODE_ENV", {
  value: "test",
  writable: true,
});
