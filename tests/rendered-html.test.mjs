import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the NOV8TECH storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /NOV8TECH — Pool Equipment/);
  assert.match(html, /Find the right equipment\. Get back to the water\./);
  assert.match(html, /Free shipping on orders over \$40/i);
  assert.match(html, /Pentair 523735-EC IntelliChlor Plus40/);
  assert.match(html, /Where innovation meets everyday life\./);
  assert.match(html, /Independent redesign preview/);
});

test("includes responsive navigation and catalog controls", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /aria-label="Mobile navigation"/);
  assert.match(html, /id="store-search"/);
  assert.equal((html.match(/data-icon="basket"/g) ?? []).length, 2);
  assert.doesNotMatch(html, />Bag</);
  assert.match(html, /Shop pool equipment/);
  assert.match(html, /Legacy clearance/);
  assert.match(html, /info@nov8tech\.com/);
});

test("keeps hubs and masks outside the primary pool catalog", async () => {
  const response = await render();
  const html = await response.text();

  const catalogStart = html.indexOf('id="catalog"');
  const legacyStart = html.indexOf('id="legacy-clearance"');
  const poolProduct = html.indexOf("Pentair 523735-EC IntelliChlor Plus40");
  const hubProduct = html.indexOf("7in2 Space Gray New USB C Hub");
  const maskProduct = html.indexOf("Dolce Calma KN95 Face Mask");

  assert.ok(catalogStart >= 0);
  assert.ok(legacyStart > catalogStart);
  assert.ok(poolProduct > catalogStart && poolProduct < legacyStart);
  assert.ok(hubProduct > legacyStart);
  assert.ok(maskProduct > legacyStart);
});
