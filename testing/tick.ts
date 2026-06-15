/**
 * Flush microtasks and optionally advance time by `ms` milliseconds.
 * Replaces Angular's fakeAsync/tick with a real async equivalent for vitest.
 */
export async function tick(ms: number = 0): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
