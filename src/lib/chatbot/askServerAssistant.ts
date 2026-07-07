/**
 * Client helper for the /api/chat serverless assistant (Industrial_Pass step 2).
 *
 * Returns the model's answer string, or null on ANY failure (timeout,
 * network error, non-200, empty answer). Callers treat null as "use the
 * local keyword-based composer instead", so the site degrades gracefully
 * when the API is rate-limited, unconfigured, or running under `vite dev`.
 */

export interface ServerAssistantPayload {
  question: string;
  resolvedQuery?: string;
}

const REQUEST_TIMEOUT_MS = 12000;

export async function askServerAssistant(
  payload: ServerAssistantPayload,
): Promise<string | null> {
  if (typeof fetch !== 'function') return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const data = (await res.json()) as { answer?: unknown };
    const answer = typeof data.answer === 'string' ? data.answer.trim() : '';
    return answer.length > 0 ? answer : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
