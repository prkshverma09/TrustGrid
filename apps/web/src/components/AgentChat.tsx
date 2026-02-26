import React from "react";

export function AgentChat({
  onSendMessage,
}: {
  onSendMessage: (message: string, reply: (response: string) => void) => void;
}) {
  const [messages, setMessages] = React.useState<Array<{ role: "user" | "agent"; text: string }>>([]);
  const [input, setInput] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    onSendMessage(userMsg, (response) => {
      setMessages((m) => [...m, { role: "agent", text: response }]);
    });
  };

  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <div key={i} data-role={msg.role}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
