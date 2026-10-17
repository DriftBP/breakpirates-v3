import { vi } from "vitest";

export const createMockGoogleAnalyticsService = () => ({
  trackPageHit: vi.fn(),
  trackEvent: vi.fn()
});

export type MockGoogleAnalyticsService = ReturnType<typeof createMockGoogleAnalyticsService>;
