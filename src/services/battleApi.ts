import type { ApiResponse } from "@/types/api";
import type { Battle, Character } from "@/types/schema";
import api from "./api";

const get = async (battleId: string) => {
  const result = await api.get<Battle>(`/battle/${battleId}`);
  return result;
};

const create = async (data: Character) => {
  const result = await api.post<{ characterId: string }, ApiResponse<string>>(
    "/battle",
    data,
  );
  return result;
};

const battleApi = { get, create };
export default battleApi;
