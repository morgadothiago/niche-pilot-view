import axios from "axios";

const webhookURL = import.meta.env.VITE_PUBLIC_N8N_WEBHOOK_URL;

export interface WebhookResponse {
  output?: string;
  response?: string;
  text?: string;
  error?: string;
  message?: string;
  detail?: string;
  [key: string]: unknown;
}

export const messageService = {
  sendMessage: async (agentId: string, userId: string, text: string): Promise<string> => {
    try {
      const response = await axios.post<WebhookResponse>(webhookURL, {
        agent_id: agentId,
        user_id: userId,
        message: text,
      });

      console.log("n8n response:", response.data);

      // Se a API retornar um campo de erro mesmo com status 200/201
      if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      // Extract text from common n8n/AI response formats
      const data = response.data;
      const aiText = data.output || data.response || data.text || JSON.stringify(data);
      return aiText;
    } catch (error: unknown) {
      console.error("Error sending message to n8n:", error);

      let errorMessage = "Erro ao conectar com o servidor de IA";

      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as WebhookResponse;
        errorMessage =
          data.message ||
          data.error ||
          data.detail ||
          (typeof data === "string" ? data : errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  },
};
