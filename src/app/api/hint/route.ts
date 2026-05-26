import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { title, description, patternName, engineType, category } = await req.json();

  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: `You are a DSA tutor helping a student who is stuck on an interactive algorithm puzzle.
Give a short, Socratic nudge — ask a guiding question or give a tiny conceptual clue.
Do NOT give the answer or code. Keep it to 2-3 sentences max. Be encouraging and casual.`,
      prompt: `The student is stuck on the "${title}" puzzle.
Category: ${category} | Pattern: ${patternName} | Engine: ${engineType}
Problem: ${description}

Give them a gentle nudge in the right direction without spoiling the solution.`,
      maxOutputTokens: 120,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI unavailable';
    return new Response(message, { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }
}
