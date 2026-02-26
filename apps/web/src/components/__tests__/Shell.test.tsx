import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Shell } from "../Shell";

describe("Shell", () => {
  it("renders header and main content area", () => {
    render(
      <Shell>
        <span>Main content</span>
      </Shell>
    );
    expect(screen.getByRole("banner")).toBeDefined();
    expect(screen.getByText("Main content")).toBeDefined();
  });
});
