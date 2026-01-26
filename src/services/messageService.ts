import { apiClient } from "./apiClient";
import { ApiResponse } from "../types";
import { toast } from "sonner";

export interface Message {
  id: string;
  chat_id: string;
  content: string;
  role: "user" | "assistant";
  created_at: string;
}

export interface Chat {
  id: string;
  user_id: string;
  agent_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
}

export interface ChatResponse {
  message: Message; // A API retorna a mensagem do assistente
}

interface SendMessageResponse {
  data?: {
    agent_response?: {
      content: string;
    };
    message?: {
      content: string;
    };
    text?: string;
  };
  agent_response?: {
    content: string;
  };
  message?: {
    content: string;
  };
  text?: string;
}

export const messageService = {
  // Listar todos os chats do usuário
  getChats: async (): Promise<Chat[]> => {
    const response = await apiClient.get<Chat[] | ApiResponse<Chat[]>>("/api/chats");
    if (Array.isArray(response.data)) return response.data;
    return (response.data as ApiResponse<Chat[]>).data || [];
  },

  // Criar um novo chat com um agente
  createChat: async (agentId: string, title: string = "Nova conversa"): Promise<Chat> => {
    const version = "V4-DEEP-LOG";
    try {
      const payload = {
        agent_id: agentId,
        title: title || "Conversa",
      };

      console.log(`🚀 [${version}] Criando chat:`, payload);

      const response = await apiClient.post<Chat | ApiResponse<Chat>>("/api/chats", payload);
      return (response.data as ApiResponse<Chat>).data || (response.data as Chat);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as {
          response?: {
            data?: { message?: string | string[]; details?: { message?: string | string[] } };
          };
        };
        if (err.response?.data) {
          const apiError = err.response.data;
          console.error(`❌ [${version}] ERRO DETALHADO DA API:`, apiError);

          // NestJS costuma colocar os erros em apiError.details.message ou apiError.message
          const msg = apiError.details?.message || apiError.message;
          const displayMsg = Array.isArray(msg) ? msg.join(", ") : msg || "Erro desconhecido";

          toast.error(`Falha no Backend: ${displayMsg}`);
        }
      }
      throw error;
    }
  },

  // Enviar uma mensagem em um chat existente
  sendMessage: async (id: string, text: string): Promise<string> => {
    try {
      const response = await apiClient.post<SendMessageResponse>(`/api/chats/${id}/messages`, {
        content: text,
      });

      const data = response.data;
      console.log("[V5-RESP-DEBUG] Resposta bruta da API:", data);

      // O JSON do usuário confirma que a resposta vem em agent_response.content
      const content =
        data.agent_response?.content ||
        data.message?.content ||
        data.text ||
        data.data?.agent_response?.content ||
        data.data?.message?.content ||
        data.data?.text ||
        "";

      return content;
    } catch (error: unknown) {
      const err = error as { response?: { status?: number; data?: unknown } };
      const status = err.response?.status;
      if (status === 502 || status === 503 || status === 504) {
        throw new Error(
          "O servidor de IA está com problemas (Bad Gateway/Timeout). Verifique se as chaves da API de IA estão configuradas no backend."
        );
      }
      if (err.response?.data) {
        console.error("❌ Erro da API ao enviar mensagem:", err.response.data);
      }
      throw new Error("Erro de comunicação com o servidor de chat");
    }
  },

  // Nota: O endpoint /api/chats/{id}/messages é atualmente suportado apenas como POST pelo backend.
  // O histórico de mensagens (GET) não está disponível ou usa uma rota diferente.
};
