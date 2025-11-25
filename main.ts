import { DOMParser } from "@b-fuze/deno-dom";

const r = (obj: unknown) =>
  new Response(JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
    },
  });

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Use POST.", { status: 400 });
  }
  const html = (await req.json())?.attachments?.[0]?.content ?? "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent;
  const [command, ...items] = text.trim().split(/\s+/);
  if (items.length === 0) {
    return r({ text: `使い方: ${command} a b c` });
  }
  const chosen = items[Math.floor(Math.random() * items.length)];
  return r({ text: `${items.join(",")}の内、選ばれたのは ${chosen} でした。` });
});
