import { apiClient } from "./apiClient";

// Estrutura retornada pela API
interface LLMApiResponse {
  _id: string;
  props: {
    name: string;
    provider: string;
    model: string;
    maxTokens: number;
    creditCost: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Estrutura normalizada para uso no app
export interface LLM {
  id: string;
  name: string;
  provider: string;
  model: string;
  maxTokens: number;
  creditCost: number;
  active: boolean;
}

export const llmService = {
  // Listar todas as LLMs disponíveis
  getLLMs: async (): Promise<LLM[]> => {
    try {
      const response = await apiClient.get<LLMApiResponse[]>("/api/llms?all=all");

      // Mapear a estrutura da API para a estrutura do app
      const llms: LLM[] = response.data.map((item) => ({
        id: item._id,
        name: item.props.name,
        provider: item.props.provider,
        model: item.props.model,
        maxTokens: item.props.maxTokens,
        creditCost: item.props.creditCost,
        active: item.props.active,
      }));

      // Filtrar apenas LLMs ativas
      return llms.filter((llm) => llm.active);
    } catch (error) {
      console.error("Erro ao buscar LLMs:", error);
      return [];
    }
  },
};
