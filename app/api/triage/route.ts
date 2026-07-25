import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpdesk triage assistant. Given a user's plain-English description of a tech problem, return ONLY valid JSON with this exact structure:

{
  "ticket_category": "hardware | network | software | security | other",
  "ticket_priority": "low | medium | high | critical",
  "suggested_steps": ["step1", "step2", "step3"]
}

Rules:
- ticket_category must be exactly one of: hardware, network, software, security, other
- ticket_priority must be exactly one of: low, medium, high, critical
- suggested_steps must contain 1 to 3 short, actionable troubleshooting steps a non-technical user can attempt first
- Do not include explanations, markdown formatting, or code fences outside the JSON
- If the issue could be security-related (e.g. suspicious activity, phishing, unauthorized access), prioritize "security" as the category and lean toward higher priority`;

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid description" },
        { status: 400 },
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: description }],
    });

    const block = response.content[0];

    if (block.type !== "text") {
      return NextResponse.json(
        { error: "Unexpected response format from AI" },
        { status: 500 },
      );
    }

    const cleaned = block.text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "");

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("Failed to parse AI response: ", block.text);
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Triage error: ", error);
    return NextResponse.json(
      { error: "Something went wrong during triage" },
      { status: 500 },
    );
  }
}
