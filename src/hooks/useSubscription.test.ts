import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSubscription } from "./useSubscription";

// Mock AuthContext
const mockUser = { id: "test-user-id", email: "test@example.com" };
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(() => ({
    user: mockUser,
  })),
}));

describe("useSubscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return default subscription when user is logged in", async () => {
    const { result } = renderHook(() => useSubscription());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.subscription).toBeDefined();
    expect(result.current.subscription?.plan).toBe("free");
    expect(result.current.subscription?.status).toBe("active");
  });

  it("should return null subscription when user is not logged in", async () => {
    const { useAuth } = await import("@/contexts/AuthContext");
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      refreshProfile: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
    });

    const { result } = renderHook(() => useSubscription());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.subscription).toBeNull();
  });

  it("should have refetch function", () => {
    const { result } = renderHook(() => useSubscription());
    expect(typeof result.current.refetch).toBe("function");
  });
});
