import assert from "node:assert/strict";
import test from "node:test";
import { withRetry } from "../app/services/retry.server";

test("retries transient failures and returns the third result", async () => {
  const observed: Array<{ attempt: number; failed: boolean }> = [];
  const result = await withRetry(async (attempt) => {
    if (attempt < 3) throw new Error("temporary outage");
    return 42;
  }, {
    attempts: 3,
    sleep: async () => undefined,
    onAttempt: ({ attempt, error }) => { observed.push({ attempt, failed: Boolean(error) }); },
  });
  assert.deepEqual(result, { value: 42, attempts: 3 });
  assert.deepEqual(observed, [
    { attempt: 1, failed: true },
    { attempt: 2, failed: true },
    { attempt: 3, failed: false },
  ]);
});

test("does not retry a permanent failure", async () => {
  let attempts = 0;
  await assert.rejects(() => withRetry(async () => {
    attempts += 1;
    throw new Error("invalid request");
  }, { attempts: 3, shouldRetry: () => false }), /invalid request/);
  assert.equal(attempts, 1);
});
