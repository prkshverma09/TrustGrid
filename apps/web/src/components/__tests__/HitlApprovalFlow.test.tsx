import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HitlApprovalFlow } from "../HitlApprovalFlow";

describe("HitlApprovalFlow", () => {
  it("calls onApprove with actionId when Approve clicked", () => {
    const onApprove = vi.fn();
    render(
      <HitlApprovalFlow
        pending={[{ actionId: "a1", vendorId: "v1", tier: 1 }]}
        onApprove={onApprove}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /approve/i }));
    expect(onApprove).toHaveBeenCalledWith("a1");
  });
});
