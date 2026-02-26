import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PendingActionsCard } from "../PendingActionsCard";

describe("PendingActionsCard", () => {
  it("shows count and Approve when pending exist", () => {
    const pending = [
      { actionId: "a1", vendorId: "v1", tier: 1 },
    ];
    render(<PendingActionsCard pending={pending} onApprove={() => {}} />);
    expect(screen.getByText(/1/)).toBeDefined();
    expect(screen.getByRole("button", { name: /approve/i })).toBeDefined();
  });
});
