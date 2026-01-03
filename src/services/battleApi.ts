import type { ApiResponse } from "@/types/api";
import type { Battle } from "@/types/schema";
import api from "./api";

const get = async (battleId: string) => {
  const result = await api.get<null, ApiResponse<Battle>>(
    `/battles/${battleId}`,
  );
  return result;
};

const create = async (characterId: string) => {
  const result = await api.post<{ characterId: string }, ApiResponse<string>>(
    "/battles",
    { characterId },
  );
  return result;
};

const battleApi = { get, create };
export default battleApi;
