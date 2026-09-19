import { useEffect } from "react";
import type { ActionFunctionArgs, HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useFetcher, useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import prisma from "../db.server";
import { authenticate } from "../shopify.server";
import { findInventoryCandidate, listInventoryCandidates, syncInventory } from "../services/inventory-sync.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const [candidates, runs, events, failedCount] = await Promise.all([
    listInventoryCandidates(admin),
    prisma.syncRun.findMany({ where: { shop: session.shop }, orderBy: { createdAt: "desc" }, take: 12, include: { attempts: true } }),
    prisma.webhookEvent.findMany({ where: { shop: session.shop }, orderBy: { receivedAt: "desc" }, take: 8 }),
    prisma.syncRun.count({ where: { shop: session.shop, status: "FAILED" } }),
  ]);
  return {
    shop: session.shop,
    candidates,
    runs: runs.map((run) => ({ ...run, startedAt: run.startedAt.toISOString(), finishedAt: run.finishedAt?.toISOString() ?? null })),
    events: events.map((event) => ({ id: event.id, topic: event.topic, status: event.status, error: event.error, receivedAt: event.receivedAt.toISOString(), processedAt: event.processedAt?.toISOString() ?? null })),
    failedCount,
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const form = await request.formData();
  try {
    const inventoryItemId = String(form.get("inventoryItemId") ?? "");
    const locationId = String(form.get("locationId") ?? "");
    const candidate = await findInventoryCandidate(admin, inventoryItemId, locationId);
    if (!candidate) throw new Error("Inventory target was not found in this shop. Refresh the dashboard.");
    const simulatedFailures = Number(form.get("simulatedFailures") ?? 0);
    if (![0, 2, 3].includes(simulatedFailures)) throw new Error("Invalid retry demo option.");
    const run = await syncInventory(admin, {
      ...candidate,
      shop: session.shop,
      trigger: "MANUAL",
      endpoint: new URL("/api/mock-inventory", request.url).toString(),
      simulatedFailures,
    });
    return { ok: true, message: run.status === "SKIPPED" ? `${run.sku} is already at ${run.finalQuantity}.` : `Synced ${run.sku} to ${run.finalQuantity}.`, runId: run.id };
  } catch (caught) {
    const error = caught instanceof Error ? caught : new Error(String(caught));
    return { ok: false, message: error.message };
  }
};

const dateTime = (value: string | null) => value ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "—";
const statusClass = (status: string) => `status status--${status.toLowerCase()}`;

export default function InventorySyncDashboard() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();
  const busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.message) shopify.toast.show(fetcher.data.message, fetcher.data.ok ? undefined : { isError: true });
  }, [fetcher.data, shopify]);

  const submit = (candidate: (typeof data.candidates)[number], simulatedFailures: number) => {
    fetcher.submit({ ...candidate, available: String(candidate.available), simulatedFailures: String(simulatedFailures) }, { method: "POST" });
  };

  const successCount = data.runs.filter((run) => run.status === "SUCCEEDED" || run.status === "SKIPPED").length;
  const retryCount = data.runs.filter((run) => run.attemptCount > 1).length;

  return (
    <s-page heading="Inventory Sync Monitor">
      <style>{`
        .monitor-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.metric{padding:18px;border:1px solid #d7ddd8;border-radius:12px;background:#fff}.metric span{display:block;color:#616b64;font-size:12px}.metric strong{display:block;margin-top:6px;font-size:26px}.table-wrap{overflow:auto}.monitor-table{width:100%;border-collapse:collapse;font-size:13px}.monitor-table th,.monitor-table td{padding:12px 10px;border-bottom:1px solid #e5e9e6;text-align:left;vertical-align:top}.monitor-table th{color:#526057;font-size:11px;text-transform:uppercase;letter-spacing:.05em}.actions{display:flex;gap:7px;white-space:nowrap}.status{display:inline-flex;padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700}.status--succeeded,.status--skipped,.status--processed{background:#dff3e5;color:#176b36}.status--failed{background:#fce4e4;color:#9d2525}.status--pending,.status--processing{background:#fff0ce;color:#795500}.muted{color:#66716a}.error-text{color:#a22626;max-width:45ch}.attempts{margin:4px 0 0;padding-left:16px;color:#66716a;font-size:11px}@media(max-width:850px){.monitor-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.actions{flex-direction:column}}`}</style>
      <s-section heading="Live integration status">
        <s-paragraph>Authenticated shop: <s-text>{data.shop}</s-text>. Quantities are read from Shopify Admin GraphQL, reconciled against the mock warehouse API, then written with compare-and-set and an idempotency key.</s-paragraph>
        <div className="monitor-grid">
          <div className="metric"><span>Inventory targets</span><strong>{data.candidates.length}</strong></div>
          <div className="metric"><span>Successful runs shown</span><strong>{successCount}</strong></div>
          <div className="metric"><span>Runs that retried</span><strong>{retryCount}</strong></div>
          <div className="metric"><span>Visible failures</span><strong>{data.failedCount}</strong></div>
        </div>
      </s-section>
      <s-section heading="Shopify inventory">
        <s-paragraph>Run a normal synchronization, recover after two warehouse failures, or force all three attempts to fail so the error appears in the log.</s-paragraph>
        <div className="table-wrap"><table className="monitor-table">
          <thead><tr><th>Product / variant</th><th>SKU</th><th>Location</th><th>Shopify available</th><th>Actions</th></tr></thead>
          <tbody>{data.candidates.map((candidate) => <tr key={`${candidate.inventoryItemId}-${candidate.locationId}`}>
            <td><strong>{candidate.productTitle}</strong><br /><span className="muted">{candidate.variantTitle}</span></td><td>{candidate.sku}</td><td>{candidate.locationName}</td><td>{candidate.available}</td>
            <td><div className="actions"><s-button disabled={busy || undefined} onClick={() => submit(candidate, 0)}>Sync now</s-button><s-button disabled={busy || undefined} variant="secondary" onClick={() => submit(candidate, 2)}>Retry demo</s-button><s-button disabled={busy || undefined} variant="secondary" onClick={() => submit(candidate, 3)}>Failure demo</s-button></div></td>
          </tr>)}</tbody>
        </table></div>
      </s-section>
      <s-section heading="Sync event log">
        <div className="table-wrap"><table className="monitor-table">
          <thead><tr><th>Status</th><th>Trigger</th><th>SKU</th><th>Quantity</th><th>Attempts</th><th>Time / failure</th></tr></thead>
          <tbody>{data.runs.map((run) => <tr key={run.id}>
            <td><span className={statusClass(run.status)}>{run.status}</span></td><td>{run.trigger}</td><td>{run.sku}</td><td>{run.previousQuantity} → {run.finalQuantity ?? run.targetQuantity ?? "—"}</td>
            <td>{run.attemptCount || run.attempts.length}{run.attempts.length > 0 && <ul className="attempts">{run.attempts.map((attempt) => <li key={attempt.id}>#{attempt.attempt}: {attempt.message}</li>)}</ul>}</td>
            <td>{dateTime(run.finishedAt)}{run.error && <div className="error-text">{run.error}</div>}</td>
          </tr>)}{data.runs.length === 0 && <tr><td colSpan={6} className="muted">No runs yet. Choose an inventory row above.</td></tr>}</tbody>
        </table></div>
      </s-section>
      <s-section heading="Webhook deliveries">
        <div className="table-wrap"><table className="monitor-table"><thead><tr><th>Status</th><th>Topic</th><th>Webhook ID</th><th>Received</th><th>Error</th></tr></thead>
          <tbody>{data.events.map((event) => <tr key={event.id}><td><span className={statusClass(event.status)}>{event.status}</span></td><td>{event.topic}</td><td><code>{event.id}</code></td><td>{dateTime(event.receivedAt)}</td><td className="error-text">{event.error ?? "—"}</td></tr>)}{data.events.length === 0 && <tr><td colSpan={5} className="muted">No webhook deliveries recorded yet.</td></tr>}</tbody>
        </table></div>
      </s-section>
      <s-section slot="aside" heading="Safety model"><s-unordered-list>
        <s-list-item>Webhook IDs are unique database keys.</s-list-item><s-list-item>GraphQL writes use Shopify idempotency keys.</s-list-item><s-list-item>Inventory writes compare against the observed quantity.</s-list-item><s-list-item>Transient external failures retry with backoff.</s-list-item><s-list-item>Every failure and attempt remains visible.</s-list-item>
      </s-unordered-list></s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => boundary.headers(headersArgs);
