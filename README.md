# DeskLite [in progress]

**AI-powered IT ticket triage for teams too small to have an IT department.**

---

## Overview

DeskLite is a lightweight helpdesk tool where anyone can describe a tech problem in plain English and instantly get an AI-generated category, priority level, and first-line troubleshooting steps — before a human ever has to look at it.

It's built for small companies and teams that don't have a dedicated IT department, where "IT support" usually just means pinging whoever's good with computers on Slack. DeskLite gives that person (or that future version of you) a system instead of a flood of unsorted messages.

## Problem It Solves

- Small teams have no formal way to log, prioritize, or track tech issues — everything lives in scattered Slack DMs or gets forgotten.
- Whoever ends up as the "unofficial IT person" has no way to see what's urgent vs. what can wait.
- The same issues come up again and again with no record of how they were solved last time.
- Non-technical employees don't know basic first steps to try before escalating, wasting everyone's time on simple fixes.

## Goals

- Give anyone a fast, no-training-needed way to report a tech issue.
- Use AI to do the first pass of triage: categorize, prioritize, and suggest initial fixes.
- Create a simple, searchable record of issues over time.
- Keep the MVP small enough to build and demo quickly, with a clear path to add features later.

## Who It's For

- Small businesses and startups with no dedicated IT staff.
- Teams where tech support is handled informally and inconsistently.
- Anyone acting as an "accidental IT person" who needs help prioritizing what lands on their plate.

## MVP Feature Set

1. **Submit a ticket** — a simple form where a user types their issue in plain language.
2. **AI triage** — on submit, the description is sent to an LLM, which returns:
   - Category (Hardware / Network / Software / Security / Other)
   - Priority (Low / Medium / High / Critical)
   - 2–3 suggested first troubleshooting steps
3. **Ticket dashboard** — a list view of all submitted tickets with category and priority badges.
4. **Ticket detail view** — full description plus the AI's suggested steps for a single ticket.

Deliberately left out of v1: authentication, multi-user roles, real-time updates, and workflow states beyond open/resolved. The goal is a complete, demoable loop first.

## Tech Stack

| Layer                 | Choice                   |
| --------------------- | ------------------------ |
| Frontend + API routes | Next.js                  |
| Styling               | Tailwind CSS, Shadcn     |
| Database              | Supabase (Postgres)      |
| AI triage             | LLM API call (Anthropic) |
| Hosting               | Vercel                   |

## Data Model (v1)

```
tickets
- id
- description       (text, user input)
- category           (enum: hardware / network / software / security / other)
- priority            (enum: low / medium / high / critical)
- suggested_steps  (text or JSON array)
- status               (open / resolved)
- created_at
```

## Core Flow

1. User submits a ticket describing their issue.
2. The description is sent to an LLM with a prompt asking it to categorize the issue, assign a priority, and suggest first troubleshooting steps, returned as structured JSON.
3. The parsed response is saved to the `tickets` table alongside the original description.
4. The dashboard lists all tickets, sortable/filterable by category, priority, and status.

## What Makes It Different

- The AI isn't decorative — it's doing real triage work a human would otherwise have to do manually, which is a legitimate "AI adds value" story rather than AI for its own sake.
- It's purpose-built for a specific, underserved audience (small teams with no IT department) instead of being a generic helpdesk clone.
- It's designed to grow alongside real skills being learned in parallel — IT support fundamentals, data analytics, and AI — so each new feature reflects new knowledge, not just scope creep.

## Roadmap (Post-MVP)

1. **Status workflow** — open → in progress → resolved, for a real ticket lifecycle.
2. **Search & filtering** — filter the dashboard by category, priority, and status.
3. **Authentication** — tie tickets to individual users via Supabase Auth.
4. **Analytics view** — charts for most common issue categories, average resolution time, and trends over time.
5. **Confidence & escalation logic** — flag low-confidence AI categorizations for manual review instead of guessing.
6. **Internal knowledge base (RAG-lite)** — reference real troubleshooting notes learned along the way, instead of relying purely on general LLM knowledge.

---

_Built by Dianne Angelika Ramirez as a personal project bridging web development, IT support fundamentals, and applied AI._
