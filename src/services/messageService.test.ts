import { describe, it, expect, vi, beforeEach } from "vitest";
import { messageService } from "./messageService";
import { apiClient } from "./apiClient";

// Mock apiClient
vi.mock("./apiClient", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("messageService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(() => "mock-token"),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  describe("getChats", () => {
    it("should fetch chats successfully", async () => {
      const mockChats = [
        {
          id: "chat-1",
          user_id: "user-1",
          agent_id: "agent-1",
          title: "Test Chat",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockChats });

      const result = await messageService.getChats();

      expect(apiClient.get).toHaveBeenCalledWith("/api/chats");
      expect(result).toEqual(mockChats);
    });

    it("should handle wrapped response", async () => {
      const mockChats = [{ id: "chat-1", title: "Test" }];
      vi.mocked(apiClient.get).mockResolvedValue({ data: { data: mockChats } });

      const result = await messageService.getChats();

      expect(result).toEqual(mockChats);
    });

    it("should return empty array on error", async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error("Network error"));

      const result = await messageService.getChats();

      expect(result).toEqual([]);
    });
  });

  describe("getMessages", () => {
    it("should fetch messages for a chat", async () => {
      const mockMessages = [
        {
          id: "msg-1",
          chat_id: "chat-1",
          content: "Hello",
          role: "user",
          created_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "msg-2",
          chat_id: "chat-1",
          content: "Hi there!",
          role: "assistant",
          created_at: "2024-01-01T00:00:01Z",
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockMessages });

      const result = await messageService.getMessages("chat-1");

      expect(apiClient.get).toHaveBeenCalledWith("/api/chats/chat-1/messages");
      expect(result).toEqual(mockMessages);
    });

    it("should return empty array on error", async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error("Not found"));

      const result = await messageService.getMessages("invalid-id");

      expect(result).toEqual([]);
    });
  });

  describe("createChat", () => {
    it("should create a new chat", async () => {
      const mockChat = {
        id: "new-chat",
        agent_id: "agent-1",
        title: "New Chat",
        created_at: "2024-01-01T00:00:00Z",
      };

      vi.mocked(apiClient.post).mockResolvedValue({ data: mockChat });

      const result = await messageService.createChat("agent-1", "New Chat");

      expect(apiClient.post).toHaveBeenCalledWith("/api/chats", {
        agent_id: "agent-1",
        title: "New Chat",
      });
      expect(result).toEqual(mockChat);
    });

    it("should use default title if not provided", async () => {
      const mockChat = { id: "new-chat" };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockChat });

      await messageService.createChat("agent-1");

      expect(apiClient.post).toHaveBeenCalledWith("/api/chats", {
        agent_id: "agent-1",
        title: "Nova conversa",
      });
    });
  });

  describe("deleteChat", () => {
    it("should delete a chat", async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({ data: {} });

      await messageService.deleteChat("chat-1");

      expect(apiClient.delete).toHaveBeenCalledWith("/api/chats/chat-1");
    });
  });

  describe("sendMessage", () => {
    it("should send a message and return response", async () => {
      const mockResponse = {
        agent_response: {
          content: "Hello! How can I help you?",
        },
      };

      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await messageService.sendMessage("chat-1", "Hello");

      expect(apiClient.post).toHaveBeenCalledWith("/api/chats/chat-1/messages", {
        content: "Hello",
      });
      expect(result).toBe("Hello! How can I help you?");
    });

    it("should handle different response formats", async () => {
      const mockResponse = {
        message: {
          content: "Response from message.content",
        },
      };

      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await messageService.sendMessage("chat-1", "Test");

      expect(result).toBe("Response from message.content");
    });
  });
});
