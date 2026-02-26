import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AgentChat } from "../AgentChat";

describe("AgentChat", () => {
  it("displays response when message submitted", async () => {
    const onSend = vi.fn().mockImplementation((msg, cb) => cb("Echo: " + msg));
    render(<AgentChat onSendMessage={onSend} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.submit(input.closest("form")!);
    expect(onSend).toHaveBeenCalledWith("hello", expect.any(Function));
    expect(await screen.findByText(/Echo: hello/)).toBeDefined();
  });
});
