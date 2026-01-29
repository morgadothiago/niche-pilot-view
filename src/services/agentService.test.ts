import { describe, it, expect, vi, beforeEach } from "vitest";
import { agentService } from "./agentService";
import { apiClient } from "./apiClient";

// Mock apiClient
vi.mock("./apiClient", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("agentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAgents", () => {
    it("should fetch agents successfully", async () => {
      const mockAgents = [
        {
          id: "agent-1",
          name: "Test Agent",
          avatar: "🤖",
          description: "A test agent",
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockAgents });

      const result = await agentService.getAgents("user-1");

      expect(apiClient.get).toHaveBeenCalledWith("/api/agents", {
        params: { user_id: "user-1" },
      });
      expect(result).toEqual(mockAgents);
    });

    it("should handle wrapped response", async () => {
      const mockAgents = [{ id: "agent-1", name: "Test" }];
      vi.mocked(apiClient.get).mockResolvedValue({ data: { data: mockAgents } });

      const result = await agentService.getAgents();

      expect(result).toEqual(mockAgents);
    });

    it("should call without user_id param when not provided", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: [] });

      await agentService.getAgents();

      expect(apiClient.get).toHaveBeenCalledWith("/api/agents", {
        params: {},
      });
    });
  });

  describe("getAgent", () => {
    it("should fetch a single agent", async () => {
      const mockAgent = {
        id: "agent-1",
        name: "Test Agent",
        avatar: "🤖",
      };

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockAgent });

      const result = await agentService.getAgent("agent-1");

      expect(apiClient.get).toHaveBeenCalledWith("/api/agents/agent-1");
      expect(result).toEqual(mockAgent);
    });
  });

  describe("createAgent", () => {
    it("should create an agent with all fields", async () => {
      const mockAgent = {
        id: "new-agent",
        name: "New Agent",
        llmId: "llm-1",
      };

      vi.mocked(apiClient.post).mockResolvedValue({ data: mockAgent });

      const result = await agentService.createAgent({
        llmId: "llm-1",
        name: "New Agent",
        avatar: "🤖",
        description: "Description",
        prompt: "You are helpful",
        category: "Support",
        type: "Assistant",
        tone: "Professional",
        style: "Formal",
        focus: "Customer support",
        rules: "Be polite",
        visibility: "PRIVATE",
      });

      expect(apiClient.post).toHaveBeenCalledWith("/api/agents", {
        llmId: "llm-1",
        name: "New Agent",
        avatar: "🤖",
        description: "Description",
        prompt: "You are helpful",
        category: "Support",
        type: "Assistant",
        tone: "Professional",
        style: "Formal",
        focus: "Customer support",
        rules: "Be polite",
        visibility: "PRIVATE",
      });
      expect(result).toEqual(mockAgent);
    });

    it("should use default values for missing fields", async () => {
      const mockAgent = { id: "new-agent" };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockAgent });

      await agentService.createAgent({ name: "Test" });

      expect(apiClient.post).toHaveBeenCalledWith("/api/agents", {
        llmId: "",
        name: "Test",
        avatar: "🤖",
        description: "",
        prompt: "",
        category: "",
        type: "Assistente Virtual",
        tone: "Profissional",
        style: "Formal",
        focus: "",
        rules: "",
        visibility: "PRIVATE",
      });
    });
  });

  describe("updateAgent", () => {
    it("should update an agent", async () => {
      const mockAgent = {
        id: "agent-1",
        name: "Updated Agent",
      };

      vi.mocked(apiClient.patch).mockResolvedValue({ data: mockAgent });

      const result = await agentService.updateAgent("agent-1", {
        name: "Updated Agent",
      });

      expect(apiClient.patch).toHaveBeenCalledWith("/api/agents/agent-1", {
        name: "Updated Agent",
      });
      expect(result).toEqual(mockAgent);
    });
  });

  describe("deleteAgent", () => {
    it("should delete an agent", async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({ data: {} });

      await agentService.deleteAgent("agent-1");

      expect(apiClient.delete).toHaveBeenCalledWith("/api/agents/agent-1");
    });
  });
});
