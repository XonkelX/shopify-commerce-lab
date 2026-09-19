export type RetryAttempt = {
  attempt: number;
  durationMs: number;
  error?: Error;
};

export type RetryOptions = {
  attempts?: number;
  baseDelayMs?: number;
  shouldRetry?: (error: Error) => boolean;
  onAttempt?: (result: RetryAttempt) => void | Promise<void>;
  sleep?: (delayMs: number) => Promise<void>;
};

export async function withRetry<T>(
  operation: (attempt: number) => Promise<T>,
  options: RetryOptions = {},
): Promise<{ value: T; attempts: number }> {
  const attempts = options.attempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 250;
  const sleep = options.sleep ?? ((delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs)));
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const startedAt = Date.now();
    let value: T;
    try {
      value = await operation(attempt);
    } catch (caught) {
      const error = caught instanceof Error ? caught : new Error(String(caught));
      lastError = error;
      await options.onAttempt?.({ attempt, durationMs: Date.now() - startedAt, error });
      const retryable = options.shouldRetry?.(error) ?? true;
      if (!retryable || attempt === attempts) break;
      await sleep(baseDelayMs * 2 ** (attempt - 1));
      continue;
    }
    await options.onAttempt?.({ attempt, durationMs: Date.now() - startedAt });
    return { value, attempts: attempt };
  }

  throw lastError ?? new Error("Retry operation failed without an error.");
}
