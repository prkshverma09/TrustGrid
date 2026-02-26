import React from "react";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header role="banner">
        <h1>TrustGrid</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
