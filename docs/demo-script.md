# TrustGrid Demo Script (4 minutes)

## 0:00 – 0:45 | The enterprise friction point

- Describe dynamic supply chain vulnerability as the main risk.
- Explain why static questionnaires and unconstrained agents are insufficient.
- Set up: “Enterprises need continuous, governed vendor risk.”

## 0:45 – 1:15 | The AIRIA architectural solution

- Introduce the multi-agent architecture and name AIRIA building blocks:
  - **Agent Builder** for the three specialized agents (Discovery, Compliance, Remediation).
  - **A2A protocol** for secure handoffs and Agent Cards.
  - **MCP Gateway** for zero-trust external telemetry.
  - **Agent Constraints** for safety (e.g. Tier-1 HITL).
- One-line summary: “We use Agent Builder for our swarm, A2A for collaboration, MCP Gateway for zero-trust, and Agent Constraints to enforce safety.”

## 1:15 – 2:30 | Live workflow execution

- Show **Discovery Agent** detecting a finding (e.g. mock Tier-3 analytics vendor).
- Show handoff via **A2A** to the **Compliance Agent** and a generated report/brief.
- Show the **Remediation Agent** autonomously severing the Tier-3 vendor (e.g. API key revoked via MCP).

## 2:30 – 3:30 | The blocked action (Tier-1)

- Introduce a **Tier-1 ERP vendor** scenario.
- Show the Remediation Agent **attempting** an action that policy forbids.
- Highlight the **AIRIA Agent Constraint** (policy engine) **blocking** the action at the infrastructure layer.
- Show the action suspended and surfaced for human review.

## 3:30 – 4:00 | HITL resolution and value

- Show the **AIRIA Governance Dashboard** (TrustGrid governance UI).
- Human admin receives the alert, reviews the Compliance brief, and clicks **“Approve Quarantine.”**
- Show the action completing and the resulting risk reduction.
- Closing line: “TrustGrid turns vendor risk and compliance into a continuous, autonomous, and safe process.”

---

## Submission checklist

- [ ] Agent name (e.g. TrustGrid) set in DevPost and Airia Community.
- [ ] Project description: target users, technologies, key features, solution overview, problem statement.
- [ ] Demo video: ≤4 min, narration or captions, real-time agent demo, hosted on YouTube or Vimeo.
- [ ] Airia Community: agent published, set to Public, Community URL added to DevPost.
