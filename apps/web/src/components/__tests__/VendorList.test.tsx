import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VendorList } from "../VendorList";

describe("VendorList", () => {
  it("renders rows from prop", () => {
    const vendors = [
      { id: "v1", name: "Vendor One", tier: 1 },
      { id: "v2", name: "Vendor Two", tier: 3 },
    ];
    render(<VendorList vendors={vendors} />);
    expect(screen.getByText("Vendor One")).toBeDefined();
    expect(screen.getByText("Vendor Two")).toBeDefined();
  });
});
