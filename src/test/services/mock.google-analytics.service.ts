import { vi } from "vitest";

export const MockGoogleAnalyticsService = {
  trackPageHit: vi.fn(),
  trackEvent: vi.fn()
}
