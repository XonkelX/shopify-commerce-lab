import type { LoaderFunctionArgs } from "react-router";
import { asNonNegativeInteger, targetQuantityForSku } from "../services/mock-inventory";

const attempts = new Map<string, number>();

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const expectedToken = process.env.MOCK_EXTERNAL_API_TOKEN;
  if (!expectedToken) return Response.json({ error: "Warehouse API is not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${expectedToken}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const sku = url.searchParams.get("sku") ?? "";
  const operationKey = request.headers.get("x-operation-key") ?? "anonymous";
  const simulatedFailures = asNonNegativeInteger(request.headers.get("x-simulated-failures"));
  const currentAttempt = (attempts.get(operationKey) ?? 0) + 1;
  attempts.set(operationKey, currentAttempt);

  if (currentAttempt <= simulatedFailures) {
    return Response.json({ error: "Simulated upstream outage", attempt: currentAttempt }, { status: 503 });
  }
  attempts.delete(operationKey);

  try {
    return Response.json({ sku, available: targetQuantityForSku(sku), source: "mock-warehouse", attempt: currentAttempt });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 422 });
  }
};
