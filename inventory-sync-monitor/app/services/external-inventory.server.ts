import { withRetry } from "./retry.server";

export class ExternalInventoryError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "ExternalInventoryError";
  }
}

type FetchInventoryOptions = {
  endpoint: string;
  sku: string;
  operationKey: string;
  simulatedFailures?: number;
  onAttempt?: (attempt: number, durationMs: number, error?: Error) => void | Promise<void>;
};

export async function fetchExternalQuantity(options: FetchInventoryOptions) {
  if (!process.env.MOCK_EXTERNAL_API_TOKEN) throw new Error("MOCK_EXTERNAL_API_TOKEN is not configured.");
  const result = await withRetry(
    async () => {
      const url = new URL(options.endpoint);
      url.searchParams.set("sku", options.sku);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.MOCK_EXTERNAL_API_TOKEN}`,
          "X-Operation-Key": options.operationKey,
          "X-Simulated-Failures": String(options.simulatedFailures ?? 0),
        },
      });
      if (!response.ok) {
        throw new ExternalInventoryError(`External API returned ${response.status}.`, response.status);
      }
      const payload = (await response.json()) as { available?: unknown };
      if (!Number.isInteger(payload.available) || Number(payload.available) < 0) {
        throw new ExternalInventoryError("External API returned an invalid available quantity.");
      }
      return Number(payload.available);
    },
    {
      attempts: 3,
      baseDelayMs: 150,
      shouldRetry: (error) =>
        !(error instanceof ExternalInventoryError) || !error.status || error.status >= 500,
      onAttempt: ({ attempt, durationMs, error }) => options.onAttempt?.(attempt, durationMs, error),
    },
  );

  return { quantity: result.value, attempts: result.attempts };
}
