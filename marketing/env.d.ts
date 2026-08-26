declare global {
  interface CloudflareEnv {
    // Bound in wrangler.toml — direct Worker-to-Worker fetch to
    // goldplanner-hub, bypassing the same-zone routing ambiguity documented
    // there.
    HUB: Fetcher;
  }
}

export {};
