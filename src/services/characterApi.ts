import type { ApiResponse } from "@/types/api";
import type { Character } from "@/types/schema";
import api from "./api";

const get = async () => {
  const result = await api.get<null, ApiResponse<Character[]>>("/characters");
  return result;
};

const create = async (data: Character) => {
  const result = await api.post<Character, ApiResponse<Character>>(
    "/characters",
    data,
  );
  return result;
};

const deleteById = async (id: string) => {
  const result = await api.delete<null, ApiResponse<null>>(`/characters/${id}`);
  return result;
};

const characterApi = { get, create, deleteById };
export default characterApi;
