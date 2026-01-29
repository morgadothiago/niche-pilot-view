import { describe, it, expect, vi, beforeEach } from "vitest";
import { llmService } from "./llmService";
import { apiClient } from "./apiClient";

// Mock apiClient
vi.mock("./apiClient", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("llmService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getLLMs", () => {
    it("should fetch and transform LLMs correctly", async () => {
      const mockApiResponse = [
        {
          _id: "00000000-0000-0000-0000-000000000001",
          props: {
            name: "GPT-4",
            provider: "OpenAI",
            model: "gpt-4",
            maxTokens: 8192,
            creditCost: 2,
            active: true,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
        {
          _id: "00000000-0000-0000-0000-000000000002",
          props: {
            name: "Claude 3",
            provider: "Anthropic",
            model: "claude-3-sonnet",
            maxTokens: 200000,
            creditCost: 1,
            active: true,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockApiResponse });

      const result = await llmService.getLLMs();

      expect(apiClient.get).toHaveBeenCalledWith("/api/llms?all=all");
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: "00000000-0000-0000-0000-000000000001",
        name: "GPT-4",
        provider: "OpenAI",
        model: "gpt-4",
        maxTokens: 8192,
        creditCost: 2,
        active: true,
      });
    });

    it("should filter out inactive LLMs", async () => {
      const mockApiResponse = [
        {
          _id: "1",
          props: {
            name: "Active LLM",
            provider: "Test",
            model: "test",
            maxTokens: 1000,
            creditCost: 1,
            active: true,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
        {
          _id: "2",
          props: {
            name: "Inactive LLM",
            provider: "Test",
            model: "test",
            maxTokens: 1000,
            creditCost: 1,
            active: false,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockApiResponse });

      const result = await llmService.getLLMs();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Active LLM");
    });

    it("should return empty array on error", async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error("Network error"));

      const result = await llmService.getLLMs();

      expect(result).toEqual([]);
    });
  });
});
