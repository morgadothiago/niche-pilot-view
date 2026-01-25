import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import { authService } from "../services/authService";

vi.mock("../services/authService", () => ({
  authService: {
    getProfile: vi.fn(),
    signIn: vi.fn(),
    signUp: vi.fn(),
    signInWithGoogle: vi.fn(),
    signOut: vi.fn().mockResolvedValue(undefined),
  },
}));

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should provide auth context with default values", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
    expect(typeof result.current.signIn).toBe("function");
    expect(typeof result.current.signUp).toBe("function");
    expect(typeof result.current.signOut).toBe("function");
  });

  it("should handle signOut", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith("auth_token");
  });
});
